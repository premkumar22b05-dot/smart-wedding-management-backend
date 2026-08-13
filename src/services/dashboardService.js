const Wedding = require("../models/Wedding");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Budget = require("../models/Budget");
const Guest = require("../models/Guest");
const Checklist = require("../models/Checklist");
const Vendor = require("../models/Vendor");
const Notification = require("../models/Notification");
const Recommendation = require("../models/Recommendation");

/**
 * Get Dashboard Analytics
 */
const getDashboardData = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required.");
    }

    /**
     * Get the latest wedding created by the
     * authenticated user.
     */
    const wedding = await Wedding.findOne({
        createdBy: userId,
    })
        .sort({
            createdAt: -1,
        })
        .lean();

    if (!wedding) {
        throw new Error("Wedding not found.");
    }

    const weddingId = wedding._id;

    /**
     * ==========================================
     * Budget Analytics
     * ==========================================
     */
    const budgets = await Budget.find({
        wedding: weddingId,
    }).lean();

    const totalAllocated = budgets.reduce(
        (sum, item) =>
            sum + Number(item.allocatedAmount || 0),
        0,
    );

    const totalSpent = budgets.reduce(
        (sum, item) =>
            sum + Number(item.spentAmount || 0),
        0,
    );

    const remainingBudget =
        totalAllocated - totalSpent;

    const budgetUtilization =
        totalAllocated > 0
            ? Number(
                  (
                      (totalSpent /
                          totalAllocated) *
                      100
                  ).toFixed(2),
              )
            : 0;

    /**
     * ==========================================
     * Booking Analytics
     * ==========================================
     */
    const bookings = await Booking.find({
        wedding: weddingId,
    }).lean();

    const confirmedBookings = bookings.filter(
        (booking) =>
            booking.bookingStatus === "Confirmed",
    ).length;

    const pendingBookings = bookings.filter(
        (booking) =>
            booking.bookingStatus === "Pending",
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) =>
            booking.bookingStatus === "Cancelled",
    ).length;

    const completedBookings = bookings.filter(
        (booking) =>
            booking.bookingStatus === "Completed",
    ).length;

    /**
     * ==========================================
     * Payment Analytics
     * ==========================================
     */
    const payments = await Payment.find({
        wedding: weddingId,
    }).lean();

    const paidPayments = payments.filter(
        (payment) =>
            payment.paymentStatus === "Paid",
    );

    const pendingPayments = payments.filter(
        (payment) =>
            payment.paymentStatus === "Pending",
    );

    const failedPayments = payments.filter(
        (payment) =>
            payment.paymentStatus === "Failed",
    );

    const totalPaid = paidPayments.reduce(
        (sum, payment) =>
            sum + Number(payment.amount || 0),
        0,
    );

    const totalPending = pendingPayments.reduce(
        (sum, payment) =>
            sum + Number(payment.amount || 0),
        0,
    );

    const totalFailed = failedPayments.reduce(
        (sum, payment) =>
            sum + Number(payment.amount || 0),
        0,
    );

    /**
     * ==========================================
     * Guest Analytics
     * ==========================================
     */
    const guests = await Guest.find({
        wedding: weddingId,
    }).lean();

    const attendingGuests = guests.filter(
        (guest) =>
            guest.attendanceStatus ===
            "Attending",
    ).length;

    const notAttendingGuests = guests.filter(
        (guest) =>
            guest.attendanceStatus ===
            "Not Attending",
    ).length;

    const pendingGuests = guests.filter(
        (guest) =>
            guest.attendanceStatus ===
            "Pending",
    ).length;

    const guestAttendancePercentage =
        guests.length > 0
            ? Number(
                  (
                      (attendingGuests /
                          guests.length) *
                      100
                  ).toFixed(2),
              )
            : 0;

    /**
     * ==========================================
     * Checklist Analytics
     * ==========================================
     */
    const tasks = await Checklist.find({
        wedding: weddingId,
    }).lean();

    const completedTasks = tasks.filter(
        (task) =>
            task.status === "Completed",
    ).length;

    const inProgressTasks = tasks.filter(
        (task) =>
            task.status === "In Progress",
    ).length;

    const pendingTasks = tasks.filter(
        (task) =>
            task.status === "Pending",
    ).length;

    const checklistCompletionPercentage =
        tasks.length > 0
            ? Number(
                  (
                      (completedTasks /
                          tasks.length) *
                      100
                  ).toFixed(2),
              )
            : 0;

    /**
     * ==========================================
     * Vendor Analytics
     * ==========================================
     */
    const vendorCount =
        await Vendor.countDocuments({
            addedBy: userId,
        });

    const availableVendorCount =
        await Vendor.countDocuments({
            addedBy: userId,
            availability: true,
        });

    /**
     * ==========================================
     * Notification Analytics
     * ==========================================
     */
    const unreadNotifications =
        await Notification.countDocuments({
            user: userId,
            isRead: false,
        });

    const totalNotifications =
        await Notification.countDocuments({
            user: userId,
        });

    /**
     * ==========================================
     * Recommendation Analytics
     * ==========================================
     */
    const recommendationCount =
        await Recommendation.countDocuments({
            user: userId,
        });

    /**
     * ==========================================
     * Wedding Date
     * ==========================================
     */
    let daysUntilWedding = null;

    if (wedding.weddingDate) {
        const today = new Date();
        const weddingDate = new Date(
            wedding.weddingDate,
        );

        today.setHours(0, 0, 0, 0);
        weddingDate.setHours(0, 0, 0, 0);

        const difference =
            weddingDate.getTime() -
            today.getTime();

        daysUntilWedding = Math.max(
            0,
            Math.ceil(
                difference /
                    (1000 * 60 * 60 * 24),
            ),
        );
    }

    /**
     * ==========================================
     * Final Dashboard Response
     * ==========================================
     */
    return {
        wedding: {
            id: wedding._id,
            groomName: wedding.groomName,
            brideName: wedding.brideName,
            weddingDate: wedding.weddingDate,
            status: wedding.status,
            daysUntilWedding,
        },

        budget: {
            totalAllocated,
            totalSpent,
            remaining: remainingBudget,
            utilizationPercentage:
                budgetUtilization,
        },

        booking: {
            total: bookings.length,
            confirmed: confirmedBookings,
            pending: pendingBookings,
            cancelled: cancelledBookings,
            completed: completedBookings,
        },

        payment: {
            total: payments.length,
            paidAmount: totalPaid,
            pendingAmount: totalPending,
            failedAmount: totalFailed,
        },

        guests: {
            total: guests.length,
            attending: attendingGuests,
            notAttending:
                notAttendingGuests,
            pending: pendingGuests,
            attendancePercentage:
                guestAttendancePercentage,
        },

        checklist: {
            total: tasks.length,
            completed: completedTasks,
            inProgress: inProgressTasks,
            pending: pendingTasks,
            completionPercentage:
                checklistCompletionPercentage,
        },

        vendors: {
            total: vendorCount,
            available: availableVendorCount,
        },

        notifications: {
            total: totalNotifications,
            unread: unreadNotifications,
        },

        recommendations: {
            total: recommendationCount,
        },
    };
};

module.exports = {
    getDashboardData,
};