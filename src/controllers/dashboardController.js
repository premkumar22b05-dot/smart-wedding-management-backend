const dashboardService = require("../services/dashboardService");

/**
 * ============================================
 * Get Dashboard
 * ============================================
 */
const getDashboard = async (req, res) => {
  try {
    // Authentication middleware provides
    // the authenticated user's ID.
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        dashboard: null,
      });
    }

    const dashboard = await dashboardService.getDashboardData(userId);

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      dashboard,
    });
  } catch (error) {
    console.error("GET DASHBOARD ERROR:", error);

    // No wedding has been created yet.
    if (error.message === "Wedding not found.") {
      return res.status(404).json({
        success: false,
        message: "No wedding found. Please create your wedding first.",
        dashboard: null,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard data.",
      dashboard: null,
    });
  }
};

module.exports = {
  getDashboard,
};