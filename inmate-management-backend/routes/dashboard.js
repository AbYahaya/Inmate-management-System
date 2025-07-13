const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Inmate = require('../models/Inmate');
const Cell = require('../models/Cell');

// Helper: format date to readable string (e.g., 'YYYY-MM-DD')
const formatDate = (date) => date.toISOString().split('T')[0];

// GET /dashboard/stats
router.get('/stats', async (req, res, next) => {
  try {
    // Total inmates
    const totalInmates = await Inmate.countDocuments();

    // New admissions in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newAdmissions = await Inmate.countDocuments({ admissionDate: { $gte: sevenDaysAgo } });

    // Average sentence length (simple approximation: parse years from sentenceLength string)
    const inmatesWithSentence = await Inmate.find({ sentenceLength: { $exists: true, $ne: null } });
    let totalYears = 0;
    let count = 0;
    inmatesWithSentence.forEach(inmate => {
      const match = inmate.sentenceLength.match(/(\d+)\s*years?/i);
      if (match) {
        totalYears += parseInt(match[1], 10);
        count++;
      }
    });
    const avgSentenceLength = count > 0 ? (totalYears / count).toFixed(1) + ' years' : 'N/A';

    // Cells occupied percentage
    const totalCells = await Cell.countDocuments();
    const occupiedCells = await Cell.countDocuments({ currentOccupancy: { $gt: 0 } });
    const cellsOccupiedPercent = totalCells > 0 ? `${Math.round((occupiedCells / totalCells) * 100)}%` : 'N/A';

    const stats = [
      {
        title: 'Total Inmates',
        value: totalInmates,
        change: '+5%', // You can compute real changes if you track history
        changeType: 'increase',
        color: 'bg-blue-500',
        icon: 'Calendar',
      },
      {
        title: 'New Admissions',
        value: newAdmissions,
        change: '-2%',
        changeType: 'decrease',
        color: 'bg-green-500',
        icon: 'TrendingUp',
      },
      {
        title: 'Avg Sentence Length',
        value: avgSentenceLength,
        change: '+1%',
        changeType: 'increase',
        color: 'bg-yellow-500',
        icon: 'Clock',
      },
      {
        title: 'Cells Occupied',
        value: cellsOccupiedPercent,
        change: '+3%',
        changeType: 'increase',
        color: 'bg-red-500',
        icon: 'MapPin',
      },
    ];

    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// GET /dashboard/activity
router.get('/activity', async (req, res, next) => {
  try {
    // Example: get recent inmate admissions and cell assignments as activity
    // You may want to have a dedicated Activity collection for real apps

    // Get last 5 inmate admissions
    const recentAdmissions = await Inmate.find()
      .sort({ admissionDate: -1 })
      .limit(5)
      .select('firstName lastName inmateId admissionDate')
      .lean();

    // Format as activity entries
    const activity = recentAdmissions.map((inmate) => ({
      id: inmate._id.toString(),
      action: 'Inmate Registered',
      details: `${inmate.firstName} ${inmate.lastName} (ID: ${inmate.inmateId}) admitted`,
      time: formatDate(inmate.admissionDate),
    }));

    res.json(activity);
  } catch (err) {
    next(err);
  }
});

// GET /dashboard/releases
router.get('/releases', async (req, res, next) => {
  try {
    // Upcoming releases: inmates with releaseDate in notes or you can add a releaseDate field if available
    // Since your model does not have releaseDate, let's assume sentenceLength + admissionDate to estimate release

    // For demo, get inmates with sentenceLength and admissionDate, estimate release date, and filter for future releases

    const inmates = await Inmate.find({
      sentenceLength: { $exists: true, $ne: null },
      admissionDate: { $exists: true },
      status: 'Active',
    }).lean();

    const upcomingReleases = inmates.map(inmate => {
      // Estimate release date by adding sentence length (years) to admissionDate
      const yearsMatch = inmate.sentenceLength.match(/(\d+)\s*years?/i);
      let releaseDate = null;
      if (yearsMatch) {
        const years = parseInt(yearsMatch[1], 10);
        releaseDate = new Date(inmate.admissionDate);
        releaseDate.setFullYear(releaseDate.getFullYear() + years);
      }
      return {
        id: inmate._id.toString(),
        name: `${inmate.firstName} ${inmate.lastName}`,
        inmateId: inmate.inmateId,
        cell: inmate.cell ? inmate.cell.cellNumber || 'Unassigned' : 'Unassigned',
        releaseDate: releaseDate ? formatDate(releaseDate) : 'Unknown',
      };
    }).filter(r => {
      if (!r.releaseDate || r.releaseDate === 'Unknown') return false;
      return new Date(r.releaseDate) >= new Date();
    });

    // Sort by releaseDate ascending and limit to next 5
    upcomingReleases.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());

    res.json(upcomingReleases.slice(0, 5));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
