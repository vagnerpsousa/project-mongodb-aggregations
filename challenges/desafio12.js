db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        startStationName: "$startStationName",
        dayOfWeek: "$dayOfWeek",
      },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$count",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
