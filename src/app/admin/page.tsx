"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  User,
  Calendar,
  PhoneCall,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  BarChart3,
  RefreshCw,
  LogOut,
  ExternalLink,
  MessageSquare,
  Activity,
  FileSpreadsheet,
  Download,
  Check,
  Home,
  Building,
  ArrowUpDown,
  Sparkles,
  Layers,
  Trash2
} from "lucide-react";
import { 
  AppointmentData, 
  CallbackData, 
  fetchAppointments, 
  fetchCallbackRequests, 
  updateAppointmentStatus, 
  updateCallbackStatus,
  deleteAppointment,
  deleteCallbackRequest,
  purgeAllMockData,
  clearAllAdminRecords
} from "@/lib/firebase";

export default function AdminPortalPage() {
  // Authentication State - Always requires fresh login on every visit
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Data State
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [callbacks, setCallbacks] = useState<CallbackData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Active View & Filters
  const [activeTab, setActiveTab] = useState<"appointments" | "callbacks">("appointments");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Every time Admin Panel is opened or reloaded, require username and password
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clean out any legacy mock data automatically
      purgeAllMockData();

      // Clear any stored authentication so login is ALWAYS strictly required
      sessionStorage.removeItem("onlyphysio_admin_auth");
      sessionStorage.removeItem("onlyphysio_admin_user");
      setIsAuthenticated(false);

      const handleUnload = () => {
        sessionStorage.removeItem("onlyphysio_admin_auth");
        sessionStorage.removeItem("onlyphysio_admin_user");
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
      };
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();

    // Support both primary OnlyPhysio admin and InnovationHacks admin credentials
    const validUser =
      u === "onlyphysio@.in" ||
      u === "admin.innovationhacks@2k" ||
      u === "innovationhacks" ||
      u === "admin";

    const validPass =
      p === "9176024067.in" ||
      p === "admin.innovationhacks@2k" ||
      p === "innovationhacks" ||
      p === "9042718811";

    if (validUser && validPass) {
      sessionStorage.setItem("onlyphysio_admin_auth", "true");
      sessionStorage.setItem("onlyphysio_admin_user", u);
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoginError("Invalid username or password! Please check your credentials and try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("onlyphysio_admin_auth");
    sessionStorage.removeItem("onlyphysio_admin_user");
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Purge any legacy sample/mock entries completely
      purgeAllMockData();

      const [apptList, cbList] = await Promise.all([
        fetchAppointments(),
        fetchCallbackRequests(),
      ]);

      setAppointments(apptList);
      setCallbacks(cbList);
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllRecords = () => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Are you sure you want to clear all records?");
      if (confirmed) {
        clearAllAdminRecords();
        setAppointments([]);
        setCallbacks([]);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentData["status"], firestoreDocId?: string) => {
    await updateAppointmentStatus(id, newStatus, firestoreDocId);
    setAppointments((prev) =>
      prev.map((item) => (item.id === id || item.firestoreDocId === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleCallbackStatusChange = async (id: string, newStatus: CallbackData["status"], firestoreDocId?: string) => {
    await updateCallbackStatus(id, newStatus, firestoreDocId);
    setCallbacks((prev) =>
      prev.map((item) => (item.id === id || item.firestoreDocId === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleDeleteAppointment = async (id: string, name: string, firestoreDocId?: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(`Are you sure you want to delete appointment for ${name}?`);
      if (confirmed) {
        await deleteAppointment(id, firestoreDocId);
        setAppointments((prev) => prev.filter((item) => item.id !== id && item.firestoreDocId !== id));
      }
    }
  };

  const handleDeleteCallback = async (id: string, name: string, firestoreDocId?: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(`Are you sure you want to delete callback request for ${name}?`);
      if (confirmed) {
        await deleteCallbackRequest(id, firestoreDocId);
        setCallbacks((prev) => prev.filter((item) => item.id !== id && item.firestoreDocId !== id));
      }
    }
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      // Status Filter
      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.fullName?.toLowerCase().includes(q) ||
          item.phone?.toLowerCase().includes(q) ||
          item.condition?.toLowerCase().includes(q) ||
          item.address?.toLowerCase().includes(q) ||
          item.id?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [appointments, statusFilter, searchQuery]);

  // Filtered Callbacks
  const filteredCallbacks = useMemo(() => {
    return callbacks.filter((item) => {
      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.fullName?.toLowerCase().includes(q) ||
          item.phone?.toLowerCase().includes(q) ||
          item.primaryConcern?.toLowerCase().includes(q) ||
          item.locationArea?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [callbacks, statusFilter, searchQuery]);

  // Quick CSV Export for Appointments
  const exportAppointmentsToCSV = () => {
    const headers = ["ID", "Name", "Phone", "Age", "Gender", "Condition", "Service Mode", "Date", "Time", "Address", "Medical History", "Status"];
    const rows = filteredAppointments.map((a) => [
      a.id || "",
      `"${a.fullName || ""}"`,
      a.phone || "",
      a.age || "",
      `"${a.gender || ""}"`,
      `"${a.condition || ""}"`,
      `"${a.serviceMode || ""}"`,
      a.preferredDate || "",
      `"${a.preferredTimeSlot || ""}"`,
      `"${(a.address || "").replace(/"/g, '""')}"`,
      `"${(a.medicalHistory || "").replace(/"/g, '""')}"`,
      a.status || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onlyphysio_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick CSV Export for Callback Requests
  const exportCallbacksToCSV = () => {
    const headers = ["ID", "Caller Name", "Phone", "Chennai Area", "Health Concern", "Preferred Time", "Status"];
    const rows = filteredCallbacks.map((cb) => [
      cb.id || "",
      `"${cb.fullName || ""}"`,
      cb.phone || "",
      `"${(cb.locationArea || "").replace(/"/g, '""')}"`,
      `"${(cb.primaryConcern || "").replace(/"/g, '""')}"`,
      `"${cb.preferredTime || ""}"`,
      cb.status || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onlyphysio_callbacks_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900 font-sans">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">Loading OnlyPhysio Admin...</span>
        </div>
      </div>
    );
  }

  // 1. White & Green Clinical Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/25 to-slate-100 flex items-center justify-center px-4 font-sans text-slate-900 relative">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-md bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] text-center relative">
          {/* Logo Badge (Crisp Center-Zoomed Artwork) */}
          <div className="w-16 h-16 rounded-2xl bg-[#202530] overflow-hidden p-0 mx-auto mb-4 border-2 border-emerald-500/30 shadow-md flex items-center justify-center">
            <img
              src="/images/logo.jpg"
              alt="OnlyPhysio Logo"
              className="w-full h-full object-cover scale-[1.38]"
              loading="eager"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Only Physio Admin Panel</span>
          </div>

          {loginError && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs text-left flex items-start gap-2.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off" className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Username</span>
              </label>
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="Enter admin username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 text-base sm:text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 text-base sm:text-sm outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 hover:from-primary-hover hover:via-emerald-600 hover:to-emerald-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_20px_rgba(22,163,74,0.35)] hover:shadow-[0_8px_25px_rgba(22,163,74,0.45)] active:scale-95 transition-all cursor-pointer mt-3"
            >
              Log In to Admin Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-center">
            <Link href="/" className="text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors">
              ← Return to OnlyPhysio Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard (Clean Hospital White & Emerald Theme)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 px-3.5 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#202530] overflow-hidden border border-emerald-500/30 flex items-center justify-center shadow-xs shrink-0">
              <img
                src="/images/logo.jpg"
                alt="OnlyPhysio Logo"
                className="w-full h-full object-cover scale-[1.38]"
                loading="eager"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 font-heading truncate">
                  OnlyPhysio Admin
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-[9px] sm:text-[10px] font-black uppercase shrink-0">
                  Chennai
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium truncate">
                Clinical Dashboard &amp; Patient Lead Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors border border-slate-300"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 py-1.5 rounded-xl border border-emerald-300 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-300 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3.5 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider">
              <span>Booked Appointments</span>
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <div className="mt-2.5 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">{appointments.length}</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold block mt-0.5 leading-snug">Patient Bookings</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider">
              <span>Callback Requests</span>
              <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
            </div>
            <div className="mt-2.5 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">{callbacks.length}</span>
              <span className="text-[10px] sm:text-[11px] text-blue-700 font-bold block mt-0.5 leading-snug">Triage Enquiries</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider">
              <span>Confirmed Care</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <div className="mt-2.5 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                {appointments.filter((a) => a.status === "Confirmed" || a.status === "Completed").length}
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold block mt-0.5 leading-snug">Active &amp; Completed</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider">
              <span>Pending Action</span>
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            </div>
            <div className="mt-2.5 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-heading">
                {appointments.filter((a) => a.status === "Pending").length +
                  callbacks.filter((c) => c.status === "Pending").length}
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-700 font-bold block mt-0.5 leading-snug">Needs Contact</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation, Search, and Status Filter */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* View Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-200/90 border border-slate-300 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab("appointments");
                  setStatusFilter("ALL");
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                  activeTab === "appointments"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Bookings ({appointments.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("callbacks");
                  setStatusFilter("ALL");
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                  activeTab === "callbacks"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Callbacks ({callbacks.length})</span>
              </button>
            </div>

            {/* Actions: Export CSV */}
            {activeTab === "appointments" ? (
              <button
                onClick={exportAppointmentsToCSV}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-black text-slate-800 transition-colors shadow-xs cursor-pointer w-full sm:w-auto"
              >
                <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Export Appointments CSV</span>
              </button>
            ) : (
              <button
                onClick={exportCallbacksToCSV}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-black text-slate-800 transition-colors shadow-xs cursor-pointer w-full sm:w-auto"
              >
                <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Export Callbacks CSV</span>
              </button>
            )}
          </div>

          {/* Search Bar & Status Filter Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Live Search */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  activeTab === "appointments"
                    ? "Search patient, phone, area, condition..."
                    : "Search callback name, phone, concern..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-950 placeholder:text-slate-400 text-xs font-medium outline-none transition-all shadow-xs"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-xs"
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending Only</option>
                {activeTab === "appointments" ? (
                  <>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </>
                ) : (
                  <>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* 5. Main Data Lists / Tables */}
        {activeTab === "appointments" ? (
          /* Booked Appointments View */
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            {filteredAppointments.length === 0 ? (
              <div className="py-12 sm:py-16 px-4 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900 font-heading">
                    {searchQuery || statusFilter !== "ALL"
                      ? "No appointments match your search filter"
                      : "No Patient Bookings Recorded Yet"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {searchQuery || statusFilter !== "ALL"
                      ? "Try adjusting your search keywords or resetting status filters."
                      : "New appointment submissions from the website will appear here automatically in real time."}
                  </p>
                  {!searchQuery && statusFilter === "ALL" && (
                    <div className="pt-2">
                      <Link
                        href="/book"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200 px-4 py-2 rounded-xl border border-emerald-300 transition-all"
                      >
                        <span>Open Booking Page & Test Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Mobile Card List View (Visible on Phones < md) */}
                <div className="block md:hidden divide-y divide-slate-100">
                  {filteredAppointments.map((appt) => (
                    <div key={appt.id} className="p-3.5 sm:p-4 space-y-3 bg-white hover:bg-slate-50/60 transition-colors">
                      {/* Top Row: Ref ID + Date & Status Dropdown + Delete */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-emerald-700 font-black text-xs block">
                            {appt.id?.startsWith("#") ? appt.id : "#" + (appt.id || "OP001")}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold mt-0.5">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{appt.preferredDate}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 font-medium">{appt.preferredTimeSlot}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <select
                            value={appt.status}
                            onChange={(e) => handleStatusChange(appt.id!, e.target.value as any, appt.firestoreDocId)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-all outline-none cursor-pointer shadow-xs ${
                              appt.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                                : appt.status === "Completed"
                                ? "bg-blue-50 text-blue-900 border-blue-400"
                                : appt.status === "Cancelled"
                                ? "bg-rose-50 text-rose-900 border-rose-400"
                                : "bg-amber-50 text-amber-900 border-amber-400"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteAppointment(appt.id!, appt.fullName, appt.firestoreDocId)}
                            title="Delete appointment"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Middle Details Box */}
                      <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-heading font-black text-slate-950 text-sm">{appt.fullName}</h4>
                          <span className="text-[11px] text-slate-500 font-bold shrink-0">
                            {appt.age ? `${appt.age} yrs` : "Age N/A"} • {appt.gender || "Patient"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                              appt.serviceMode?.includes("Home")
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-slate-200 text-slate-800 border border-slate-300"
                            }`}
                          >
                            {appt.serviceMode || "Home Visit"}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{appt.condition}</span>
                        </div>

                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{appt.address || "Chennai (Central)"}</span>
                        </div>

                        {appt.medicalHistory && (
                          <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium leading-relaxed">
                            <span className="font-bold">Clinical Note:</span> {appt.medicalHistory}
                          </div>
                        )}
                      </div>

                      {/* Phone & Fast Action Buttons */}
                      <div className="space-y-1.5">
                        <div className="text-center text-[11px] font-mono font-bold text-slate-600">
                          Contact: <span className="text-slate-900">{appt.phone}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`https://wa.me/91${appt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${appt.fullName}, this is OnlyPhysio Chennai confirming your appointment on ${appt.preferredDate} (${appt.preferredTimeSlot}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 py-2.5 px-3 rounded-xl transition-colors shadow-2xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${appt.phone}`}
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 py-2.5 px-3 rounded-xl transition-colors shadow-2xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                            <span>Call Patient</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View (Visible on Screens >= md) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 uppercase font-heading font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Ref / Date</th>
                        <th className="py-3.5 px-4">Patient Details</th>
                        <th className="py-3.5 px-4">Contact & WhatsApp</th>
                        <th className="py-3.5 px-4">Service & Condition</th>
                        <th className="py-3.5 px-4">Chennai Address</th>
                        <th className="py-3.5 px-4">Status & Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/90 transition-colors">
                          {/* Ref / Date */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-mono text-emerald-700 font-black block">
                              {appt.id?.startsWith("#") ? appt.id : "#" + (appt.id || "OP001")}
                            </span>
                            <span className="text-slate-900 font-bold block mt-0.5">
                              {appt.preferredDate}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium block">{appt.preferredTimeSlot}</span>
                          </td>

                          {/* Patient Details */}
                          <td className="py-3.5 px-4">
                            <div className="font-heading font-black text-slate-950 text-sm">{appt.fullName}</div>
                            <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                              {appt.age ? `${appt.age} yrs` : "Age N/A"} • {appt.gender || "Patient"}
                            </div>
                            {appt.medicalHistory && (
                              <div className="text-[10px] text-amber-800 font-semibold mt-1 max-w-xs truncate" title={appt.medicalHistory}>
                                Note: {appt.medicalHistory}
                              </div>
                            )}
                          </td>

                          {/* Contact & WhatsApp */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-mono text-slate-950 font-bold">{appt.phone}</div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <a
                                href={`https://wa.me/91${appt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `Hello ${appt.fullName}, this is OnlyPhysio Chennai confirming your appointment on ${appt.preferredDate} (${appt.preferredTimeSlot}).`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300 transition-colors"
                              >
                                <MessageSquare className="w-3 h-3 text-emerald-600" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${appt.phone}`}
                                className="inline-flex items-center gap-1 text-[11px] font-black text-blue-800 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-300 transition-colors"
                              >
                                <PhoneCall className="w-3 h-3 text-blue-600" />
                                <span>Call</span>
                              </a>
                            </div>
                          </td>

                          {/* Service & Condition */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${
                                appt.serviceMode?.includes("Home")
                                  ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                                  : "bg-slate-100 text-slate-800 border border-slate-300"
                              }`}
                            >
                              {appt.serviceMode || "Home Visit"}
                            </span>
                            <div className="text-slate-800 font-semibold max-w-xs">{appt.condition}</div>
                          </td>

                          {/* Chennai Address */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="text-slate-700 font-medium truncate" title={appt.address}>
                              {appt.address || "Chennai (Central)"}
                            </div>
                          </td>

                          {/* Status Toggle & Delete Action */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <select
                                value={appt.status}
                                onChange={(e) => handleStatusChange(appt.id!, e.target.value as any, appt.firestoreDocId)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all outline-none cursor-pointer shadow-xs ${
                                  appt.status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                                    : appt.status === "Completed"
                                    ? "bg-blue-50 text-blue-900 border-blue-400"
                                    : appt.status === "Cancelled"
                                    ? "bg-rose-50 text-rose-900 border-rose-400"
                                    : "bg-amber-50 text-amber-900 border-amber-400"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleDeleteAppointment(appt.id!, appt.fullName, appt.firestoreDocId)}
                                title="Delete this appointment"
                                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 transition-all cursor-pointer shadow-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Callback Requests View */
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            {filteredCallbacks.length === 0 ? (
              <div className="py-12 sm:py-16 px-4 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900 font-heading">
                    {searchQuery || statusFilter !== "ALL"
                      ? "No callback requests match your search filter"
                      : "No Callback Requests Yet"}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {searchQuery || statusFilter !== "ALL"
                      ? "Try adjusting your search keywords or resetting status filters."
                      : "When patients request a triage callback from the website, they will appear here in real time."}
                  </p>
                  {!searchQuery && statusFilter === "ALL" && (
                    <div className="pt-2">
                      <Link
                        href="/callback"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-blue-800 bg-blue-100/90 hover:bg-blue-200 px-4 py-2 rounded-xl border border-blue-300 transition-all"
                      >
                        <span>Open Request Callback Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Mobile Card List View (Visible on Phones < md) */}
                <div className="block md:hidden divide-y divide-slate-100">
                  {filteredCallbacks.map((cb) => (
                    <div key={cb.id} className="p-3.5 sm:p-4 space-y-3 bg-white hover:bg-slate-50/60 transition-colors">
                      {/* Top Row: Ref ID + Preferred Time & Status Dropdown + Delete */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-emerald-700 font-black text-xs block">
                            {cb.id?.startsWith("#") ? cb.id : "#" + (cb.id || "OP001")}
                          </span>
                          <span className="inline-block mt-1 text-[11px] text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-bold">
                            {cb.preferredTime || "Anytime"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <select
                            value={cb.status}
                            onChange={(e) => handleCallbackStatusChange(cb.id!, e.target.value as any, cb.firestoreDocId)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-all outline-none cursor-pointer shadow-xs ${
                              cb.status === "Resolved"
                                ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                                : cb.status === "Contacted"
                                ? "bg-blue-50 text-blue-900 border-blue-400"
                                : "bg-amber-50 text-amber-900 border-amber-400"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteCallback(cb.id!, cb.fullName, cb.firestoreDocId)}
                            title="Delete callback request"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Middle Details Box */}
                      <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                        <h4 className="font-heading font-black text-slate-950 text-sm">{cb.fullName}</h4>
                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{cb.locationArea || "Chennai"}</span>
                        </div>
                        <div className="text-xs text-slate-800 font-medium bg-white p-2 rounded-lg border border-slate-200/60 mt-1">
                          <span className="font-bold text-slate-900">Health Concern:</span> {cb.primaryConcern}
                        </div>
                      </div>

                      {/* Phone & Fast Action Buttons */}
                      <div className="space-y-1.5">
                        <div className="text-center text-[11px] font-mono font-bold text-slate-600">
                          Caller Phone: <span className="text-slate-900">{cb.phone}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`tel:${cb.phone}`}
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 py-2.5 px-3 rounded-xl transition-colors shadow-2xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                            <span>Call Now</span>
                          </a>

                          <a
                            href={`https://wa.me/91${cb.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${cb.fullName}, OnlyPhysio senior physiotherapist calling regarding your callback request.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 py-2.5 px-3 rounded-xl transition-colors shadow-2xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View (Visible on Screens >= md) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 uppercase font-heading font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Ref / Received</th>
                        <th className="py-3.5 px-4">Caller Name</th>
                        <th className="py-3.5 px-4">Contact Phone</th>
                        <th className="py-3.5 px-4">Chennai Area</th>
                        <th className="py-3.5 px-4">Health Concern</th>
                        <th className="py-3.5 px-4">Preferred Time</th>
                        <th className="py-3.5 px-4">Status & Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCallbacks.map((cb) => (
                        <tr key={cb.id} className="hover:bg-slate-50/90 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono text-emerald-700 font-black">
                            {cb.id?.startsWith("#") ? cb.id : "#" + (cb.id || "OP001")}
                          </td>

                          <td className="py-3.5 px-4 font-heading font-black text-slate-950 text-sm">
                            {cb.fullName}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-mono text-slate-950 font-bold">{cb.phone}</div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <a
                                href={`tel:${cb.phone}`}
                                className="inline-flex items-center gap-1 text-[11px] font-black text-blue-800 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-300 transition-colors"
                              >
                                <PhoneCall className="w-3 h-3 text-blue-600" />
                                <span>Call Now</span>
                              </a>
                              <a
                                href={`https://wa.me/91${cb.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `Hello ${cb.fullName}, OnlyPhysio senior physiotherapist calling regarding your callback request.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300 transition-colors"
                              >
                                <MessageSquare className="w-3 h-3 text-emerald-600" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {cb.locationArea}
                          </td>

                          <td className="py-3.5 px-4 text-slate-900 font-semibold max-w-xs">
                            {cb.primaryConcern}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap text-amber-800 font-black">
                            {cb.preferredTime}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <select
                                value={cb.status}
                                onChange={(e) => handleCallbackStatusChange(cb.id!, e.target.value as any, cb.firestoreDocId)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all outline-none cursor-pointer shadow-xs ${
                                  cb.status === "Resolved"
                                    ? "bg-emerald-50 text-emerald-900 border-emerald-400"
                                    : cb.status === "Contacted"
                                    ? "bg-blue-50 text-blue-900 border-blue-400"
                                    : "bg-amber-50 text-amber-900 border-amber-400"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Resolved">Resolved</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleDeleteCallback(cb.id!, cb.fullName, cb.firestoreDocId)}
                                title="Delete this callback request"
                                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 transition-all cursor-pointer shadow-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
