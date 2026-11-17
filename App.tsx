import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plus,
  GripVertical,
  CheckCircle2,
  XCircle,
  Trash2,
  ArrowUp,
  ArrowDown,
  Flame,
  AlertTriangle,
  Calendar,
  Sparkles,
  Lock,
  Bell,
  Check,
  Undo2,
  ChevronDown,
  ChevronUp,
  BookMarked,
  Download,
  Upload,
  Zap,
  ShieldCheck,
  Monitor,
  Smartphone,
  Laptop,
  Wifi,
  BatteryCharging,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sliders,
  Github,
  Copy,
  Terminal,
  ExternalLink
} from 'lucide-react';

// Curated Apple-style wallpapers + Custom Upload + Pure Transparent mode
const APPLE_WALLPAPERS = [
  {
    id: 'sequoia-twilight',
    name: 'macOS Sequoia Twilight',
    style: {
      backgroundImage:
        'radial-gradient(circle at 20% 18%, rgba(94, 92, 230, 0.72) 0%, transparent 48%), radial-gradient(circle at 82% 22%, rgba(255, 55, 95, 0.58) 0%, transparent 46%), radial-gradient(circle at 50% 80%, rgba(10, 132, 255, 0.65) 0%, transparent 55%), linear-gradient(160deg, #060919 0%, #101d3b 52%, #1d1536 100%)',
    },
  },
  {
    id: 'sonoma-horizon',
    name: 'Sonoma Warm Horizon',
    style: {
      backgroundImage:
        'radial-gradient(circle at 75% 25%, rgba(255, 159, 10, 0.65) 0%, transparent 45%), radial-gradient(circle at 25% 35%, rgba(191, 90, 242, 0.6) 0%, transparent 52%), radial-gradient(circle at 55% 85%, rgba(100, 210, 255, 0.5) 0%, transparent 50%), linear-gradient(145deg, #120d2b 0%, #2a183d 48%, #0f2537 100%)',
    },
  },
  {
    id: 'ios18-aurora',
    name: 'iOS 18 Teal Aurora',
    style: {
      backgroundImage:
        'radial-gradient(circle at 30% 20%, rgba(48, 209, 88, 0.48) 0%, transparent 50%), radial-gradient(circle at 80% 35%, rgba(10, 132, 255, 0.62) 0%, transparent 50%), radial-gradient(circle at 40% 85%, rgba(94, 92, 230, 0.58) 0%, transparent 55%), linear-gradient(165deg, #04131d 0%, #092338 50%, #0c1328 100%)',
    },
  },
  {
    id: 'mountain-lake',
    name: 'Yosemite Alpine Lake',
    style: {
      backgroundImage:
        'linear-gradient(to bottom, rgba(8,14,28,0.25), rgba(8,14,28,0.55)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
  {
    id: 'desert-dunes',
    name: 'Mojave Starlight Dunes',
    style: {
      backgroundImage:
        'linear-gradient(to bottom, rgba(10,12,24,0.25), rgba(10,12,24,0.6)), url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
  {
    id: 'pure-transparent',
    name: 'Pure Transparent (Desktop Overlay)',
    style: {
      backgroundColor: 'transparent',
      backgroundImage:
        'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(135deg, rgba(15,23,42,0.45), rgba(30,41,59,0.45))',
      backgroundSize: '24px 24px, 100% 100%',
    },
  },
];

// Format Date for datetime-local input
const toLocalInputString = (date) => {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 16);
};

// Format Date to YYYY-MM-DD in local time
const getLocalDateKey = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate initial sample tasks relative to current time
const generateInitialTasks = () => {
  const now = new Date();
  return [
    {
      id: 'task-1',
      title: 'ImJ9y/problem_solve — System Design & Final Deliverable',
      dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 18 + 1000 * 60 * 40).toISOString(),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: 'task-2',
      title: 'ImJ9y/neetcode-submissions — Complete Graph & DP Set',
      dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 4 + 1000 * 60 * 15).toISOString(),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: 'task-3',
      title: 'ImJ9y/Line-Buffer-Layer-Fusion — Hardware Timing Verification',
      dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 90).toISOString(),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
      id: 'task-4',
      title: 'Annual Team Holiday Party RSVP & Slide Deck',
      dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 30).toISOString(),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 72).toISOString(),
    },
  ];
};

// Generate realistic multi-year GitHub contribution history (2023 - 2026)
const generateSampleHistory = () => {
  const history = {};
  const now = new Date();
  const currentYear = now.getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  const sampleTitles = [
    'ImJ9y/problem_solve — Dynamic Programming Milestone',
    'ImJ9y/neetcode-submissions — Graph Traversal & Trees',
    'ImJ9y/Line-Buffer-Layer-Fusion — RTL Timing Closure',
    'Client Architecture Deliverable — API Spec & Load Test',
    'Distributed Systems Final Exam — Consensus & Raft Prep',
    'LockScreen Accountability UI — Glassmorphism & Wake Lock',
    'Database Query Milestone — B-Tree Indexing Benchmark',
    'Security Audit Checklist — OAuth2 & Token Rotation',
    'Holiday Party Planning — Venue & Slide Deck Finalization',
    'Machine Learning Pipeline — Feature Store Validation',
  ];

  years.forEach((yr) => {
    const start = new Date(yr, 0, 1, 12, 0, 0);
    const end = yr === currentYear ? new Date(now) : new Date(yr, 11, 31, 12, 0, 0);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = getLocalDateKey(d);
      const dayOfYear = Math.floor((d - start) / (1000 * 60 * 60 * 24));
      const seed = (yr * 31 + d.getMonth() * 53 + d.getDate() * 11 + dayOfYear) % 100;
      const diffDaysFromToday = Math.floor((now - d) / (1000 * 60 * 60 * 24));

      // Ensure an active streak over the past 5 days
      if (yr === currentYear && diffDaysFromToday >= 0 && diffDaysFromToday <= 4) {
        const onTimeCount = (diffDaysFromToday % 3) + 2;
        const lateCount = diffDaysFromToday === 2 ? 1 : 0;
        const items = [];

        for (let idx = 0; idx < onTimeCount; idx++) {
          const itemTime = new Date(d);
          itemTime.setHours(10 + idx * 3, (seed + idx * 17) % 60, 0);
          items.push({
            id: `sample-${key}-on-${idx}`,
            title: sampleTitles[(diffDaysFromToday + idx) % sampleTitles.length],
            status: 'completed_on_time',
            wasHero: idx === 0,
            completedAt: itemTime.toISOString(),
            dueDate: new Date(itemTime.getTime() + 1000 * 60 * 60 * 4).toISOString(),
          });
        }

        if (lateCount > 0) {
          const lateTime = new Date(d);
          lateTime.setHours(21, 15, 0);
          items.push({
            id: `sample-${key}-late-0`,
            title: sampleTitles[(diffDaysFromToday + 5) % sampleTitles.length],
            status: 'completed_late',
            wasHero: false,
            completedAt: lateTime.toISOString(),
            dueDate: new Date(lateTime.getTime() - 1000 * 60 * 60 * 2).toISOString(),
          });
        }

        history[key] = {
          onTime: onTimeCount,
          late: lateCount,
          missed: 0,
          heroCompleted: 1,
          items,
        };
        continue;
      }

      // Active clusters in Jan-Feb and Jul-Nov matching the screenshot pattern
      const m = d.getMonth();
      const activeCluster = m <= 1 || (m >= 6 && m <= 10);
      const threshold = activeCluster ? 42 : 76;

      if (seed > threshold) {
        const onTimeCount = seed > 91 ? 5 : seed > 78 ? 3 : seed > 60 ? 2 : 1;
        const lateCount = seed > 90 && seed % 2 === 0 ? 1 : 0;
        const missedCount = seed === 89 ? 1 : 0;
        const heroCount = Math.ceil(onTimeCount * 0.7);

        const items = [];
        for (let c = 0; c < onTimeCount; c++) {
          const itemTime = new Date(d);
          itemTime.setHours(9 + ((c * 2) % 10), (seed + c * 13) % 60, 0);
          items.push({
            id: `sample-${key}-on-${c}`,
            title: sampleTitles[(seed + c) % sampleTitles.length],
            status: 'completed_on_time',
            wasHero: c < heroCount,
            completedAt: itemTime.toISOString(),
            dueDate: new Date(itemTime.getTime() + 1000 * 60 * 60 * 3).toISOString(),
          });
        }
        for (let l = 0; l < lateCount; l++) {
          const itemTime = new Date(d);
          itemTime.setHours(20 + l, (seed + l * 23) % 60, 0);
          items.push({
            id: `sample-${key}-late-${l}`,
            title: sampleTitles[(seed + onTimeCount + l) % sampleTitles.length],
            status: 'completed_late',
            wasHero: false,
            completedAt: itemTime.toISOString(),
            dueDate: new Date(itemTime.getTime() - 1000 * 60 * 60 * 2).toISOString(),
          });
        }
        for (let ms = 0; ms < missedCount; ms++) {
          const itemTime = new Date(d);
          itemTime.setHours(23, 30, 0);
          items.push({
            id: `sample-${key}-missed-${ms}`,
            title: sampleTitles[(seed + onTimeCount + lateCount + ms) % sampleTitles.length],
            status: 'missed',
            wasHero: false,
            completedAt: itemTime.toISOString(),
            dueDate: new Date(itemTime.getTime() - 1000 * 60 * 60 * 5).toISOString(),
          });
        }

        history[key] = {
          onTime: onTimeCount,
          late: lateCount,
          missed: missedCount,
          heroCompleted: heroCount,
          items,
        };
      }
    }
  });

  return history;
};

// Pure timestamp-based countdown calculation (survives computer sleep accurately)
const getCountdownParts = (dueDateStr, now) => {
  const due = new Date(dueDateStr).getTime();
  const current = now.getTime();
  const diff = due - current;
  const isOverdue = diff < 0;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absDiff / 1000 / 60) % 60);
  const seconds = Math.floor((absDiff / 1000) % 60);

  return { days, hours, minutes, seconds, isOverdue, diff };
};

export default function App() {
  // Real-time clock & wake sync state
  const [now, setNow] = useState(() => new Date());
  const [lastWakeSync, setLastWakeSync] = useState(() => new Date());

  // Apple Wallpaper & Ultra-Transparent Glass Opacity Controls
  const [wallpaperId, setWallpaperId] = useState(() => {
    try {
      return localStorage.getItem('apple_lock_wallpaper_id') || 'mountain-lake';
    } catch {
      return 'mountain-lake';
    }
  });
  const [customWallpaperUrl, setCustomWallpaperUrl] = useState(() => {
    try {
      return localStorage.getItem('apple_lock_custom_wallpaper') || '';
    } catch {
      return '';
    }
  });
  // Glass Opacity percentage (default 10% for ultra-transparent Apple look)
  const [glassAlpha, setGlassAlpha] = useState(() => {
    try {
      const saved = Number(localStorage.getItem('apple_lock_glass_alpha'));
      return !isNaN(saved) && saved >= 2 && saved <= 45 ? saved : 10;
    } catch {
      return 10;
    }
  });
  const [wallpaperMenuOpen, setWallpaperMenuOpen] = useState(false);

  // Cross-platform device preset: 'mac' | 'windows' | 'phone'
  const [deviceMode, setDeviceMode] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_lock_device_mode');
      if (saved) return saved;
      return typeof window !== 'undefined' && window.innerWidth < 768 ? 'phone' : 'mac';
    } catch {
      return 'mac';
    }
  });

  // Pure Lock Screen Standby Mode (hides top bar chrome so it acts as a true OS lock screen)
  const [standbyLockMode, setStandbyLockMode] = useState(false);
  const [phoneExpandFullYear, setPhoneExpandFullYear] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Screen Wake Lock API state (keeps screen awake while on Lock Screen)
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const wakeLockRef = useRef(null);
  const fileInputRef = useRef(null);
  const wallpaperFileRef = useRef(null);

  // Persistent Tasks State
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_lock_v4_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return generateInitialTasks();
  });

  // Persistent GitHub Contribution History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_lock_v5_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return generateSampleHistory();
  });

  // Persistent Recent Completion Logs for Activity Overview
  const [recentLogs, setRecentLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_lock_v4_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const todayKey = getLocalDateKey(new Date());
    return [
      {
        id: 'log-init-1',
        title: 'ImJ9y/problem_solve',
        status: 'completed_on_time',
        wasHero: true,
        dateKey: todayKey,
        completedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      },
      {
        id: 'log-init-2',
        title: 'ImJ9y/neetcode-submissions',
        status: 'completed_on_time',
        wasHero: true,
        dateKey: todayKey,
        completedAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
      },
      {
        id: 'log-init-3',
        title: 'ImJ9y/Line-Buffer-Layer-Fusion',
        status: 'completed_on_time',
        wasHero: false,
        dateKey: todayKey,
        completedAt: new Date(Date.now() - 1000 * 60 * 290).toISOString(),
      },
    ];
  });

  // Lock Screen Add-Task Form State
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState(() => {
    const defaultDue = new Date(Date.now() + 1000 * 60 * 60 * 24);
    return toLocalInputString(defaultDue);
  });

  // Direct Lock Screen Drag-and-Drop Priority State
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // GitHub Graph Controls
  const currentYear = now.getFullYear();
  const availableYears = useMemo(
    () => [currentYear, currentYear - 1, currentYear - 2, currentYear - 3],
    [currentYear]
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [heatmapFilter, setHeatmapFilter] = useState('all'); // 'all' | 'onTime' | 'missed'
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [selectedDayKey, setSelectedDayKey] = useState(() => getLocalDateKey(new Date()));
  const [hoveredDay, setHoveredDay] = useState(null);
  const [toast, setToast] = useState(null);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  // Copy helper for GitHub setup commands
  const handleCopyCommand = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedSnippet(id);
    triggerToast('Copied commands to clipboard!', 'success');
    setTimeout(() => {
      setCopiedSnippet((prev) => (prev === id ? null : prev));
    }, 2500);
  };

  // Show temporary status toast
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  // 1-second live clock + Sleep/Wake Resynchronization Listener
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    const handleWakeOrFocus = () => {
      if (document.visibilityState === 'visible') {
        const wakeTime = new Date();
        setNow(wakeTime);
        setLastWakeSync(wakeTime);
      }
    };

    document.addEventListener('visibilitychange', handleWakeOrFocus);
    window.addEventListener('focus', handleWakeOrFocus);
    window.addEventListener('pageshow', handleWakeOrFocus);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleWakeOrFocus);
      window.removeEventListener('focus', handleWakeOrFocus);
      window.removeEventListener('pageshow', handleWakeOrFocus);
    };
  }, []);

  // Automatically save tasks, history, logs, and theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gh_lock_v4_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('gh_lock_v5_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('gh_lock_v4_logs', JSON.stringify(recentLogs));
    } catch (e) {
      console.error(e);
    }
  }, [recentLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('apple_lock_wallpaper_id', wallpaperId);
    } catch (e) {
      console.error(e);
    }
  }, [wallpaperId]);

  useEffect(() => {
    try {
      localStorage.setItem('apple_lock_custom_wallpaper', customWallpaperUrl);
    } catch (e) {
      console.error(e);
    }
  }, [customWallpaperUrl]);

  useEffect(() => {
    try {
      localStorage.setItem('apple_lock_glass_alpha', String(glassAlpha));
    } catch (e) {
      console.error(e);
    }
  }, [glassAlpha]);

  useEffect(() => {
    try {
      localStorage.setItem('gh_lock_device_mode', deviceMode);
    } catch (e) {
      console.error(e);
    }
  }, [deviceMode]);

  // Upload custom user wallpaper image so they can see their own desktop/phone photo
  const handleWallpaperUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === 'string') {
        setCustomWallpaperUrl(dataUrl);
        setWallpaperId('custom');
        triggerToast('Custom Lock Screen wallpaper applied', 'success');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Screen Wake Lock API toggle so Lock Screen doesn't dim/sleep when active
  const toggleWakeLock = async () => {
    if (!('wakeLock' in navigator)) {
      triggerToast(
        'Screen Wake Lock API is restricted in this preview, but active persistence is enabled.',
        'info'
      );
      return;
    }
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setWakeLockActive(false);
        triggerToast('Screen Wake Lock released', 'info');
      } else {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        setWakeLockActive(true);
        triggerToast('Keep Awake active — screen will stay on', 'success');
        wakeLockRef.current.addEventListener('release', () => {
          setWakeLockActive(false);
          wakeLockRef.current = null;
        });
      }
    } catch {
      triggerToast('Wake Lock unavailable in embedded frame; timers remain sleep-proof.', 'info');
    }
  };

  // Fullscreen Lock Mode toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setStandbyLockMode(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setStandbyLockMode(false);
      }
    } catch {
      setStandbyLockMode((prev) => !prev);
    }
  };

  // Export JSON backup of tasks + GitHub history
  const handleExportBackup = () => {
    const payload = {
      version: 4,
      exportedAt: new Date().toISOString(),
      tasks,
      history,
      recentLogs,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `github-lockscreen-backup-${getLocalDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Exported tasks & contribution backup JSON', 'success');
  };

  // Import JSON backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed.tasks)) setTasks(parsed.tasks);
        if (parsed.history && typeof parsed.history === 'object') setHistory(parsed.history);
        if (Array.isArray(parsed.recentLogs)) setRecentLogs(parsed.recentLogs);
        triggerToast('Restored tasks and contribution history from backup!', 'success');
      } catch {
        triggerToast('Invalid backup JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Quick preset buttons for deadline input
  const applyQuickPreset = (hoursToAdd, label) => {
    const target = new Date(Date.now() + hoursToAdd * 3600 * 1000);
    setDueDateInput(toLocalInputString(target));
    triggerToast(`Due date set to ${label} from now`, 'info');
  };

  // Add new deadline task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!titleInput.trim() || !dueDateInput) return;

    const parsedDate = new Date(dueDateInput);
    if (isNaN(parsedDate.getTime())) {
      triggerToast('Please select a valid date and time', 'error');
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: titleInput.trim(),
      dueDate: parsedDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTitleInput('');
    triggerToast(`Pinned "${newTask.title}" to Lock Screen`, 'success');
  };

  // Move priority up/down or promote to #1 directly on the Lock Screen
  const moveTaskPriority = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;
    const updated = [...tasks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setTasks(updated);
    if (targetIndex === 0 || index === 0) {
      triggerToast(`#1 Priority Countdown updated to "${updated[0].title}"`, 'info');
    }
  };

  // Drag-and-Drop handlers on Lock Screen cards
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const updated = [...tasks];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, moved);
    setTasks(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);

    if (dropIndex === 0 || draggedIndex === 0) {
      triggerToast(`#1 Priority Countdown updated to "${updated[0].title}"`, 'info');
    }
  };

  // Automatically log On-Time vs Late vs Missed when resolved from the Lock Screen
  const handleResolveTask = (task, resolutionType, taskIndex = 0) => {
    const isActuallyOverdue = new Date(task.dueDate).getTime() < Date.now();
    let finalStatus = 'completed_on_time';

    if (resolutionType === 'missed') {
      finalStatus = 'missed';
    } else if (isActuallyOverdue) {
      finalStatus = 'completed_late';
    }

    const wasHero = taskIndex === 0;
    const todayDate = new Date();
    const todayKey = getLocalDateKey(todayDate);
    const logId = `log-${Date.now()}`;

    setHistory((prev) => {
      const existing = prev[todayKey] || {
        onTime: 0,
        late: 0,
        missed: 0,
        heroCompleted: 0,
        items: [],
      };
      return {
        ...prev,
        [todayKey]: {
          onTime: existing.onTime + (finalStatus === 'completed_on_time' ? 1 : 0),
          late: (existing.late || 0) + (finalStatus === 'completed_late' ? 1 : 0),
          missed: (existing.missed || 0) + (finalStatus === 'missed' ? 1 : 0),
          heroCompleted: (existing.heroCompleted || 0) + (wasHero ? 1 : 0),
          items: [
            {
              id: logId,
              title: task.title,
              status: finalStatus,
              wasHero,
              dueDate: task.dueDate,
              completedAt: todayDate.toISOString(),
              timestamp: todayDate.toISOString(),
            },
            ...(existing.items || []),
          ],
        },
      };
    });

    setRecentLogs((prev) => [
      {
        id: logId,
        title: task.title,
        status: finalStatus,
        wasHero,
        dateKey: todayKey,
        dueDate: task.dueDate,
        completedAt: todayDate.toISOString(),
      },
      ...prev.slice(0, 24),
    ]);

    setSelectedYear(todayDate.getFullYear());
    setSelectedDayKey(todayKey);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));

    if (finalStatus === 'completed_on_time') {
      triggerToast(`Completed "${task.title}" on time! Logged to GitHub graph.`, 'success');
    } else if (finalStatus === 'completed_late') {
      triggerToast(`Completed "${task.title}" past deadline (logged as overdue).`, 'warning');
    } else {
      triggerToast(`Marked "${task.title}" as missed on ${todayKey}.`, 'error');
    }
  };

  // Undo a completion log entry and restore the task back to the Lock Screen
  const handleUndoLog = (logEntry) => {
    const { id, dateKey, status, wasHero, title, dueDate } = logEntry;

    setHistory((prev) => {
      const dayRecord = prev[dateKey];
      if (!dayRecord) return prev;
      return {
        ...prev,
        [dateKey]: {
          onTime: Math.max(0, (dayRecord.onTime || 0) - (status === 'completed_on_time' ? 1 : 0)),
          late: Math.max(0, (dayRecord.late || 0) - (status === 'completed_late' ? 1 : 0)),
          missed: Math.max(0, (dayRecord.missed || 0) - (status === 'missed' ? 1 : 0)),
          heroCompleted: Math.max(0, (dayRecord.heroCompleted || 0) - (wasHero ? 1 : 0)),
          items: (dayRecord.items || []).filter((item) => item.id !== id),
        },
      };
    });

    setRecentLogs((prev) => prev.filter((l) => l.id !== id));

    // Restore back to active tasks if it had a dueDate
    if (dueDate) {
      setTasks((prev) => [
        ...prev,
        {
          id: `restored-${Date.now()}`,
          title,
          dueDate,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    triggerToast(`Reverted "${title}" from ${dateKey}`, 'info');
  };

  // Undo / Restore any specific task from a clicked Heatmap Date back to the Lock Screen
  const handleRestoreHeatmapTask = (dateKey, item) => {
    const { id, title, status, wasHero, dueDate } = item;

    setHistory((prev) => {
      const dayRecord = prev[dateKey];
      if (!dayRecord) return prev;
      return {
        ...prev,
        [dateKey]: {
          onTime: Math.max(0, (dayRecord.onTime || 0) - (status === 'completed_on_time' ? 1 : 0)),
          late: Math.max(0, (dayRecord.late || 0) - (status === 'completed_late' ? 1 : 0)),
          missed: Math.max(0, (dayRecord.missed || 0) - (status === 'missed' ? 1 : 0)),
          heroCompleted: Math.max(0, (dayRecord.heroCompleted || 0) - (wasHero ? 1 : 0)),
          items: (dayRecord.items || []).filter((entry) => entry.id !== id),
        },
      };
    });

    setRecentLogs((prev) => prev.filter((l) => l.id !== id));

    const fallbackDue = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    const restoredDue =
      dueDate && new Date(dueDate).getTime() > Date.now() ? dueDate : fallbackDue;

    setTasks((prev) => [
      ...prev,
      {
        id: `restored-${Date.now()}`,
        title,
        dueDate: restoredDue,
        createdAt: new Date().toISOString(),
      },
    ]);

    triggerToast(`Restored "${title}" from ${dateKey} back to Lock Screen`, 'info');
  };

  // Delete task without logging to contribution history
  const handleDeleteTask = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    triggerToast(`Removed "${task.title}" from Lock Screen`, 'info');
  };

  // Build Full-Year (Jan - Dec) GitHub Contribution Matrix + 4-Axis Crosshair Metrics
  const heatmapData = useMemo(() => {
    const weeks = [];
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const todayKey = getLocalDateKey(today);

    const jan1 = new Date(selectedYear, 0, 1);
    const dec31 = new Date(selectedYear, 11, 31);

    const startSunday = new Date(jan1);
    startSunday.setDate(jan1.getDate() - jan1.getDay());

    const endSaturday = new Date(dec31);
    endSaturday.setDate(dec31.getDate() + (6 - dec31.getDay()));

    const totalDays = Math.round((endSaturday - startSunday) / (1000 * 60 * 60 * 24)) + 1;
    const totalWeeks = Math.round(totalDays / 7);

    let totalOnTime = 0;
    let totalLate = 0;
    let totalMissed = 0;
    let totalHeroCompleted = 0;
    let lastMonth = -1;

    for (let w = 0; w < totalWeeks; w++) {
      const weekDays = [];
      let monthLabelForWeek = null;

      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startSunday);
        cellDate.setDate(startSunday.getDate() + w * 7 + d);
        const key = getLocalDateKey(cellDate);
        const inSelectedYear = cellDate.getFullYear() === selectedYear;
        const isFuture = cellDate > today;
        const record = history[key] || {
          onTime: 0,
          late: 0,
          missed: 0,
          heroCompleted: 0,
          items: [],
        };

        if (inSelectedYear && cellDate.getDate() <= 7 && d === 0) {
          const m = cellDate.getMonth();
          if (m !== lastMonth) {
            monthLabelForWeek = cellDate.toLocaleDateString('en-US', { month: 'short' });
            lastMonth = m;
          }
        } else if (inSelectedYear && cellDate.getMonth() === 0 && lastMonth === -1) {
          monthLabelForWeek = 'Jan';
          lastMonth = 0;
        }

        const lateCount = record.late || 0;
        const missedCount = record.missed || 0;
        const legacyLateOrMissed = record.lateOrMissed || 0;
        const combinedLateOrMissed =
          lateCount + missedCount > 0 ? lateCount + missedCount : legacyLateOrMissed;

        if (inSelectedYear && !isFuture) {
          totalOnTime += record.onTime || 0;
          totalLate += lateCount || Math.ceil(legacyLateOrMissed * 0.5);
          totalMissed += missedCount || Math.floor(legacyLateOrMissed * 0.5);
          totalHeroCompleted +=
            record.heroCompleted !== undefined
              ? record.heroCompleted
              : Math.ceil((record.onTime || 0) * 0.65);
        }

        weekDays.push({
          date: cellDate,
          key,
          dayOfWeek: d,
          inSelectedYear,
          isFuture,
          isToday: key === todayKey,
          onTime: record.onTime || 0,
          lateOrMissed: combinedLateOrMissed,
          items: record.items || [],
        });
      }

      weeks.push({
        weekIndex: w,
        monthLabel: monthLabelForWeek,
        days: weekDays,
      });
    }

    // Current daily streak calculation
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const key = getLocalDateKey(checkDate);
      const rec = history[key];
      if (rec && rec.onTime > 0) {
        streak++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }

    const totalLateOrMissed = totalLate + totalMissed;
    const totalLogged = totalOnTime + totalLateOrMissed;

    // 4-Axis Percentages: Left = On-time, Top = Hero #1, Right = Missed, Bottom = Late
    const onTimePct = totalLogged > 0 ? Math.round((totalOnTime / totalLogged) * 100) : 100;
    const heroPct =
      totalLogged > 0 ? Math.min(100, Math.round((totalHeroCompleted / totalLogged) * 100)) : 0;
    const missedPct = totalLogged > 0 ? Math.round((totalMissed / totalLogged) * 100) : 0;
    const latePct = totalLogged > 0 ? Math.round((totalLate / totalLogged) * 100) : 0;

    return {
      weeks,
      totalWeeks,
      totalOnTime,
      totalLateOrMissed,
      totalLogged,
      onTimePct,
      heroPct,
      missedPct,
      latePct,
      streak,
    };
  }, [history, now, selectedYear]);

  // Selected Day object from grid
  const selectedDayObj = useMemo(() => {
    for (const week of heatmapData.weeks) {
      for (const day of week.days) {
        if (day.key === selectedDayKey) return day;
      }
    }
    return null;
  }, [heatmapData, selectedDayKey]);

  const heroTask = tasks[0] || null;
  const secondaryTasks = tasks.slice(1);
  const heroCountdown = heroTask ? getCountdownParts(heroTask.dueDate, now) : null;

  // Translucent Apple-Styled GitHub Cell Colors (Empty cells are ultra-clear so wallpaper shines through)
  const getGitHubCellStyle = (day) => {
    if (!day.inSelectedYear) {
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        opacity: 0,
        pointerEvents: 'none',
      };
    }
    const emptyBg = 'rgba(255, 255, 255, 0.09)';
    const emptyBorder = 'rgba(255, 255, 255, 0.14)';

    if (day.isFuture) {
      return { backgroundColor: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.07)', opacity: 0.5 };
    }

    // Translucent glowing Apple-GitHub Emerald scale
    const greens = [
      'rgba(48, 209, 88, 0.35)',
      'rgba(48, 209, 88, 0.58)',
      'rgba(48, 209, 88, 0.80)',
      'rgba(52, 199, 89, 0.98)',
    ];

    if (heatmapFilter === 'onTime') {
      if (day.onTime === 0) return { backgroundColor: emptyBg, borderColor: emptyBorder };
      const lvl = Math.min(3, day.onTime - 1);
      return {
        backgroundColor: greens[lvl],
        borderColor: 'rgba(255, 255, 255, 0.28)',
        boxShadow: lvl >= 2 ? '0 0 8px rgba(48, 209, 88, 0.35)' : 'none',
      };
    }

    if (heatmapFilter === 'missed') {
      if (day.lateOrMissed === 0) return { backgroundColor: emptyBg, borderColor: emptyBorder };
      return {
        backgroundColor: day.lateOrMissed > 1 ? 'rgba(255, 69, 58, 0.9)' : 'rgba(255, 159, 10, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.28)',
      };
    }

    // Default 'all' view
    if (day.onTime === 0 && day.lateOrMissed === 0) {
      return { backgroundColor: emptyBg, borderColor: emptyBorder };
    }
    if (day.lateOrMissed > 0 && day.onTime === 0) {
      return {
        backgroundColor: 'rgba(255, 69, 58, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
      };
    }
    const lvl = Math.min(3, day.onTime - 1);
    return {
      backgroundColor: greens[lvl],
      borderColor: 'rgba(255, 255, 255, 0.28)',
      boxShadow: lvl >= 2 ? '0 0 8px rgba(48, 209, 88, 0.35)' : 'none',
    };
  };

  // Compute active background wallpaper style
  const activeWallpaperStyle = useMemo(() => {
    if (wallpaperId === 'custom' && customWallpaperUrl) {
      return {
        backgroundImage: `linear-gradient(to bottom, rgba(6,10,20,0.18), rgba(6,10,20,0.42)), url("${customWallpaperUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    const found = APPLE_WALLPAPERS.find((w) => w.id === wallpaperId) || APPLE_WALLPAPERS[0];
    return found.style;
  }, [wallpaperId, customWallpaperUrl]);

  // Dynamic Apple Frosted Glass inline styles controlled by the user's transparency slider
  const glassWidgetStyle = {
    backgroundColor: `rgba(255, 255, 255, ${(glassAlpha / 100).toFixed(3)})`,
    backdropFilter: 'blur(16px) saturate(160%)',
    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  };

  const glassSubtleStyle = {
    backgroundColor: `rgba(255, 255, 255, ${Math.max(0.03, (glassAlpha - 4) / 100).toFixed(3)})`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  };

  const glassPillBtn =
    'bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 text-white/95 backdrop-blur-md transition-all cursor-pointer';

  // Recent 16 weeks slice for compact Phone Lock Screen widget
  const mobileWeeksSlice = useMemo(() => {
    const currentWeekIdx = heatmapData.weeks.findIndex((w) =>
      w.days.some((d) => d.isToday)
    );
    const endIdx = currentWeekIdx >= 0 ? currentWeekIdx + 1 : heatmapData.weeks.length;
    const startIdx = Math.max(0, endIdx - 16);
    return heatmapData.weeks.slice(startIdx, endIdx);
  }, [heatmapData]);

  return (
    <div
      style={{
        ...activeWallpaperStyle,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
      }}
      className="min-h-screen text-white flex flex-col justify-between relative overflow-x-hidden select-none transition-all duration-500"
    >
      {/* Hidden File Inputs for JSON Backup & Custom Wallpaper Image */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleImportBackup}
        className="hidden"
      />
      <input
        ref={wallpaperFileRef}
        type="file"
        accept="image/*"
        onChange={handleWallpaperUpload}
        className="hidden"
      />

      {/* Ultra-Translucent macOS / Windows Top Menu Bar */}
      {deviceMode !== 'phone' && (
        <div className="px-5 py-1.5 bg-black/15 backdrop-blur-md border-b border-white/10 text-[12px] font-medium text-white/90 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-semibold tracking-tight">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{deviceMode === 'mac' ? 'macOS Lock Screen' : 'Windows Lock Screen'}</span>
            </span>
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/75"
              title={`Last wake sync: ${lastWakeSync.toLocaleTimeString()}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Synced {lastWakeSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-[12px] text-white/90">
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300 font-medium">
              <Flame className="w-3.5 h-3.5" />
              <span>{heatmapData.streak}d Streak</span>
            </span>
            <Wifi className="w-3.5 h-3.5" />
            <span className="inline-flex items-center gap-1">
              <span className="text-[11px]">100%</span>
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="tracking-tight">
              {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
              {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
        </div>
      )}

      {/* Floating Apple Glass Pill Control Bar (Hidden in pure Standby Lock Mode) */}
      {!standbyLockMode && (
        <header className="z-30 pt-3 px-4 flex justify-center">
          <div
            style={glassWidgetStyle}
            className="max-w-[1280px] w-full rounded-full border px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2"
          >
            {/* Left: Device Mode Segmented Pill (Mac / Windows / iPhone) */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex rounded-full bg-black/20 border border-white/15 p-0.5">
                {[
                  { id: 'mac', label: 'Mac', icon: Laptop },
                  { id: 'windows', label: 'Windows', icon: Monitor },
                  { id: 'phone', label: 'iPhone', icon: Smartphone },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = deviceMode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDeviceMode(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        active
                          ? 'bg-white/25 text-white shadow-xs backdrop-blur-md'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Glass Transparency Slider so user can make widgets as see-through as they want */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/15 text-xs">
                <Sliders className="w-3.5 h-3.5 text-white/75" />
                <span className="text-white/75">Glass</span>
                <input
                  type="range"
                  min="3"
                  max="35"
                  value={glassAlpha}
                  onChange={(e) => setGlassAlpha(Number(e.target.value))}
                  className="w-20 accent-white cursor-pointer"
                  title="Adjust widget transparency to see more of your background"
                />
                <span className="font-mono text-[11px] text-white/80 w-7">{glassAlpha}%</span>
              </div>
            </div>

            {/* Right: Wallpaper Picker, Keep Awake, Backup, & Pure Lock Screen Mode */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Wallpaper & Custom Photo Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setWallpaperMenuOpen(!wallpaperMenuOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${glassPillBtn}`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Wallpaper</span>
                  <ChevronDown className="w-3 h-3 opacity-75" />
                </button>

                {wallpaperMenuOpen && (
                  <div
                    style={{
                      backgroundColor: 'rgba(18, 22, 32, 0.78)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                    }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/20 shadow-2xl p-2 z-50 text-xs space-y-1"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                      Apple Lock Screen Backgrounds
                    </div>
                    {APPLE_WALLPAPERS.map((wp) => (
                      <button
                        key={wp.id}
                        type="button"
                        onClick={() => {
                          setWallpaperId(wp.id);
                          setWallpaperMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between hover:bg-white/15 transition cursor-pointer"
                      >
                        <span>{wp.name}</span>
                        {wallpaperId === wp.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}

                    <div className="my-1 border-t border-white/15" />

                    <button
                      type="button"
                      onClick={() => {
                        wallpaperFileRef.current?.click();
                        setWallpaperMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 text-sky-300 hover:bg-white/15 transition cursor-pointer font-medium"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Your Own Photo...</span>
                    </button>

                    {/* Mobile Glass Slider inside menu */}
                    <div className="px-2.5 pt-2 pb-1 border-t border-white/15 lg:hidden">
                      <div className="flex items-center justify-between text-[11px] text-white/75 mb-1">
                        <span>Widget Opacity</span>
                        <span>{glassAlpha}%</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="35"
                        value={glassAlpha}
                        onChange={(e) => setGlassAlpha(Number(e.target.value))}
                        className="w-full accent-white cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Keep Awake Toggle */}
              <button
                type="button"
                onClick={toggleWakeLock}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  wakeLockActive
                    ? 'bg-emerald-500/30 border border-emerald-300/50 text-emerald-200 backdrop-blur-md'
                    : glassPillBtn
                }`}
                title="Keep screen awake while Lock Screen is active"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {wakeLockActive ? 'Awake Locked' : 'Keep Awake'}
                </span>
              </button>

              {/* GitHub Repo & Deployment Setup Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsGitHubModalOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${glassPillBtn}`}
                title="Create & deploy this Lock Screen on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Setup</span>
              </button>

              {/* JSON Backup & Restore */}
              <button
                type="button"
                onClick={handleExportBackup}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${glassPillBtn}`}
                title="Export tasks & history JSON"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${glassPillBtn}`}
                title="Restore tasks & history JSON"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>

              {/* Enter Pure Lock Screen Standby Mode */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/25 hover:bg-white/35 border border-white/35 text-white text-xs font-semibold shadow-sm backdrop-blur-md transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Screen Mode</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Translucent Apple Notification Toast */}
      {toast && (
        <div
          style={{
            backgroundColor: 'rgba(15, 20, 30, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          className="fixed bottom-16 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/25 shadow-2xl text-xs font-medium text-white"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Bell className="w-4 h-4 text-sky-300 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Lock Screen Canvas */}
      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 py-4 flex flex-col justify-center">
        {/* APPLE LOCK SCREEN GIANT TRANSLUCENT CLOCK (Desktop Mac / Windows Mode) */}
        {deviceMode !== 'phone' && (
          <div
            className={`mb-6 select-none ${
              deviceMode === 'windows'
                ? 'text-left sm:flex sm:items-end sm:justify-between px-2'
                : 'text-center'
            }`}
          >
            <div>
              <div className="text-base sm:text-lg font-medium tracking-wide text-white/85 drop-shadow-xs">
                {now.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div
                style={{
                  textShadow: '0 8px 32px rgba(0, 0, 0, 0.28)',
                }}
                className="text-6xl sm:text-8xl font-semibold tracking-tight leading-none text-white/95 tabular-nums mt-0.5"
              >
                {now.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            </div>

            {/* Minimal Apple Lock Screen Complication Pills */}
            <div
              className={`mt-3 sm:mt-0 inline-flex flex-wrap items-center justify-center gap-2 ${
                deviceMode === 'mac' ? 'mx-auto' : ''
              }`}
            >
              <span
                style={glassSubtleStyle}
                className="px-3.5 py-1 rounded-full border text-xs font-medium text-white/90"
              >
                {tasks.length} Active {tasks.length === 1 ? 'Deadline' : 'Deadlines'}
              </span>
              <span
                style={glassSubtleStyle}
                className="px-3.5 py-1 rounded-full border text-xs font-medium text-emerald-300"
              >
                {heatmapData.onTimePct}% On-Time
              </span>
              <span
                style={glassSubtleStyle}
                className="px-3.5 py-1 rounded-full border text-xs font-medium text-white/90"
              >
                {heatmapData.streak}d Streak
              </span>
            </div>
          </div>
        )}

        {/* MAIN CONTENT GRID: IPHONE FRAME vs MAC/WINDOWS TRANSLUCENT WIDGETS */}
        <div
          className={
            deviceMode === 'phone'
              ? 'max-w-[420px] w-full mx-auto'
              : 'grid grid-cols-1 lg:grid-cols-12 gap-5 items-start'
          }
        >
          {/* LEFT COLUMN (OR PHONE LOCK SCREEN): PRIORITY COUNTDOWN & DRAGGABLE NOTIFICATIONS */}
          <div className={deviceMode === 'phone' ? 'w-full' : 'lg:col-span-5'}>
            <div
              style={deviceMode === 'phone' ? glassWidgetStyle : undefined}
              className={
                deviceMode === 'phone'
                  ? 'rounded-[44px] border p-5 space-y-4 shadow-2xl'
                  : 'space-y-3.5'
              }
            >
              {/* iPhone Lock Screen Clock Header */}
              {deviceMode === 'phone' && (
                <div className="pt-1 pb-2 text-center">
                  <div className="flex items-center justify-between text-[11px] font-medium text-white/85 px-2 mb-3">
                    <span>
                      {now.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                    <div className="px-3 py-0.5 rounded-full bg-black/35 border border-white/15 text-[10px] inline-flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Locked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" />
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>

                  <div className="text-sm font-medium text-white/85">
                    {now.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div
                    style={{ textShadow: '0 6px 24px rgba(0,0,0,0.25)' }}
                    className="text-6xl font-semibold tracking-tight tabular-nums leading-none mt-0.5 text-white/95"
                  >
                    {now.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </div>
                </div>
              )}

              {/* #1 PRIORITY COUNTDOWN APPLE WIDGET (Ultra-Transparent Frosted Card) */}
              {heroTask && heroCountdown ? (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, 0)}
                  onDragOver={(e) => handleDragOver(e, 0)}
                  onDrop={(e) => handleDrop(e, 0)}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  style={glassWidgetStyle}
                  className={`rounded-3xl border p-4 sm:p-5 transition-all ${
                    draggedIndex === 0 ? 'opacity-40 scale-95' : 'opacity-100'
                  } ${
                    dragOverIndex === 0 && draggedIndex !== 0 ? 'ring-2 ring-white/70' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="cursor-grab active:cursor-grabbing text-white/60 hover:text-white"
                        title="Drag to reorder #1 priority"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          heroCountdown.isOverdue
                            ? 'bg-rose-500/25 text-rose-200 border-rose-300/40'
                            : 'bg-white/15 text-white border-white/25'
                        }`}
                      >
                        <Flame className="w-3 h-3 text-amber-300" />
                        <span>#1 Priority</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-white/75">
                        Due{' '}
                        {new Date(heroTask.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => moveTaskPriority(0, 1)}
                          className={`p-1 rounded-full ${glassPillBtn}`}
                          title="Move down to #2"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug mb-3.5 pl-1">
                    {heroTask.title}
                  </h3>

                  {/* Ultra-Clean Apple 4-Pill Live Countdown */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: 'Days', value: heroCountdown.days },
                      { label: 'Hours', value: heroCountdown.hours },
                      { label: 'Min', value: heroCountdown.minutes },
                      { label: 'Sec', value: heroCountdown.seconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        style={glassSubtleStyle}
                        className="rounded-2xl border py-2.5 px-1"
                      >
                        <div
                          className={`text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight ${
                            heroCountdown.isOverdue ? 'text-rose-300' : 'text-white'
                          }`}
                        >
                          {heroCountdown.isOverdue ? '-' : ''}
                          {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/65 mt-0.5">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtle Action Pills */}
                  <div className="mt-3.5 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-white/70">
                      {heroCountdown.isOverdue
                        ? 'Overdue deadline'
                        : 'Completing logs +1 to heatmap'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleResolveTask(heroTask, 'complete', 0)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/35 hover:bg-emerald-500/50 border border-emerald-300/40 text-white text-xs font-medium backdrop-blur-md transition cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveTask(heroTask, 'missed', 0)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/25 hover:bg-rose-500/40 border border-rose-300/35 text-rose-100 text-xs font-medium backdrop-blur-md transition cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Missed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(heroTask)}
                        className={`p-1.5 rounded-full ${glassPillBtn}`}
                        title="Remove from Lock Screen"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white/80" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={glassWidgetStyle}
                  className="rounded-3xl border p-6 text-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-white">All Lock Screen Tasks Clear</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    Tap &ldquo;+ New Deadline&rdquo; below to pin a countdown.
                  </p>
                </div>
              )}

              {/* STACKED APPLE LOCK SCREEN NOTIFICATION PILLS (Drag to reorder priority) */}
              {secondaryTasks.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/75">
                      Up Next ({secondaryTasks.length})
                    </span>
                    <span className="text-[11px] text-white/65">
                      Drag or tap #rank to promote
                    </span>
                  </div>

                  {secondaryTasks.map((task, idx) => {
                    const actualIndex = idx + 1;
                    const cd = getCountdownParts(task.dueDate, now);
                    const isDragged = draggedIndex === actualIndex;
                    const isDragOver =
                      dragOverIndex === actualIndex && draggedIndex !== actualIndex;

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, actualIndex)}
                        onDragOver={(e) => handleDragOver(e, actualIndex)}
                        onDrop={(e) => handleDrop(e, actualIndex)}
                        onDragEnd={() => {
                          setDraggedIndex(null);
                          setDragOverIndex(null);
                        }}
                        style={glassWidgetStyle}
                        className={`rounded-2xl border px-3.5 py-2.5 transition-all ${
                          isDragged ? 'opacity-40 scale-95' : 'opacity-100'
                        } ${isDragOver ? 'ring-2 ring-white/70' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className="cursor-grab active:cursor-grabbing text-white/55 hover:text-white shrink-0"
                              title="Drag to change priority"
                            >
                              <GripVertical className="w-4 h-4" />
                            </div>

                            <button
                              type="button"
                              onClick={() => moveTaskPriority(actualIndex, -actualIndex)}
                              title="Promote to #1 Priority"
                              className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-[11px] font-semibold text-white shrink-0 transition cursor-pointer"
                            >
                              #{actualIndex + 1}
                            </button>

                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-white truncate">
                                {task.title}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-white/70">
                                <span>
                                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </span>
                                <span>•</span>
                                <span
                                  className={`font-medium tabular-nums ${
                                    cd.isOverdue ? 'text-rose-300' : 'text-emerald-300'
                                  }`}
                                >
                                  {cd.isOverdue
                                    ? 'Overdue'
                                    : cd.days > 0
                                    ? `${cd.days}d ${cd.hours}h ${cd.minutes}m`
                                    : `${cd.hours}h ${cd.minutes}m ${cd.seconds}s`}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Minimal Apple Notification Action Icons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveTaskPriority(actualIndex, -1)}
                              className={`p-1 rounded-full ${glassPillBtn}`}
                              title="Move up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveTaskPriority(actualIndex, 1)}
                              disabled={actualIndex === tasks.length - 1}
                              className={`p-1 rounded-full disabled:opacity-30 ${glassPillBtn}`}
                              title="Move down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleResolveTask(task, 'complete', actualIndex)}
                              className="p-1.5 rounded-full bg-emerald-500/35 hover:bg-emerald-500/55 border border-emerald-300/40 text-white transition cursor-pointer"
                              title="Complete"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleResolveTask(task, 'missed', actualIndex)}
                              className="p-1.5 rounded-full bg-rose-500/25 hover:bg-rose-500/45 border border-rose-300/35 text-rose-100 transition cursor-pointer"
                              title="Mark missed"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task)}
                              className={`p-1.5 rounded-full ${glassPillBtn}`}
                              title="Remove"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Minimal Translucent "+ New Deadline" Drawer */}
              <div style={glassWidgetStyle} className="rounded-3xl border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(!isAddFormOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-medium text-white/90 hover:bg-white/5 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-300" />
                    <span>New Lock Screen Deadline</span>
                  </span>
                  {isAddFormOpen ? (
                    <ChevronUp className="w-4 h-4 text-white/70" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/70" />
                  )}
                </button>

                {isAddFormOpen && (
                  <form
                    onSubmit={handleAddTask}
                    className="px-4 pb-4 pt-2 border-t border-white/15 space-y-2.5"
                  >
                    <input
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Task title (e.g., Final Exam, Client Deliverable)..."
                      className="w-full px-3.5 py-2 rounded-2xl bg-black/25 border border-white/20 text-xs sm:text-sm text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/40"
                      required
                    />
                    <input
                      type="datetime-local"
                      value={dueDateInput}
                      onChange={(e) => setDueDateInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-2xl bg-black/25 border border-white/20 text-xs font-mono text-white [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-white/40"
                      required
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1">
                        {[
                          { label: '+2h', hours: 2 },
                          { label: '+1d', hours: 24 },
                          { label: '+3d', hours: 72 },
                          { label: '+1w', hours: 168 },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => applyQuickPreset(preset.hours, preset.label)}
                            className={`px-2.5 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/25 hover:bg-white/35 border border-white/35 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pin Task</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Compact Translucent Activity Heatmap inside iPhone Mode */}
              {deviceMode === 'phone' && (
                <div style={glassSubtleStyle} className="rounded-3xl border p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {heatmapData.totalLogged.toLocaleString()} contributions
                      </span>
                      <span className="text-[11px] text-white/70">
                        {heatmapData.onTimePct}% on-time • {heatmapData.streak}d streak
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhoneExpandFullYear(!phoneExpandFullYear)}
                      className={`px-2.5 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                    >
                      {phoneExpandFullYear ? '16 Weeks' : 'Full Year'}
                    </button>
                  </div>

                  <div className="overflow-x-auto pb-1">
                    <div
                      className="grid gap-[3px]"
                      style={{
                        gridTemplateColumns: `repeat(${
                          phoneExpandFullYear ? heatmapData.totalWeeks : mobileWeeksSlice.length
                        }, minmax(0, 1fr))`,
                        minWidth: phoneExpandFullYear ? '540px' : '100%',
                      }}
                    >
                      {(phoneExpandFullYear ? heatmapData.weeks : mobileWeeksSlice).map((week) => (
                        <div key={`m-week-${week.weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                          {week.days.map((day) => (
                            <button
                              key={`m-${day.key}`}
                              type="button"
                              disabled={day.isFuture || !day.inSelectedYear}
                              onClick={() => setSelectedDayKey(day.key)}
                              style={getGitHubCellStyle(day)}
                              className={`w-full aspect-square rounded-[3px] border ${
                                selectedDayKey === day.key ? 'ring-1 ring-white' : ''
                              }`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Selected Day Task History List */}
                  {selectedDayObj && selectedDayObj.inSelectedYear && !phoneExpandFullYear && (
                    <div className="pt-2 border-t border-white/15 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white">
                          {selectedDayObj.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-white/70">
                          {selectedDayObj.onTime} on-time • {selectedDayObj.lateOrMissed} late/missed
                        </span>
                      </div>
                      {selectedDayObj.items && selectedDayObj.items.length > 0 ? (
                        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                          {selectedDayObj.items.map((item) => (
                            <div
                              key={item.id}
                              className="px-2.5 py-1.5 rounded-xl bg-black/25 border border-white/15 flex items-center justify-between gap-2 text-[11px]"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                {item.status === 'completed_on_time' && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                )}
                                {item.status === 'completed_late' && (
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                )}
                                {item.status === 'missed' && (
                                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                )}
                                <span className="text-white truncate">{item.title}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRestoreHeatmapTask(selectedDayObj.key, item)}
                                className="p-1 rounded-full hover:bg-white/20 text-white/75 hover:text-white shrink-0 cursor-pointer"
                                title="Restore task to Lock Screen"
                              >
                                <Undo2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-white/60 italic">
                          No tasks logged on this date.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* iPhone Home Indicator Bar */}
              {deviceMode === 'phone' && (
                <div className="pt-1 flex justify-center">
                  <div className="w-32 h-1.5 rounded-full bg-white/50" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: ULTRA-TRANSPARENT APPLE-GLASS GITHUB CONTRIBUTION HEATMAP & OVERVIEW */}
          {(deviceMode !== 'phone' || phoneExpandFullYear) && (
            <div className={deviceMode === 'phone' ? 'w-full mt-4' : 'lg:col-span-7'}>
              <div
                style={glassWidgetStyle}
                className="rounded-3xl border overflow-hidden transition-all"
              >
                {/* Widget Top Header Bar with Year Pills & Filter */}
                <div className="px-5 pt-4 pb-3 border-b border-white/15 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold tracking-tight text-white">
                      {heatmapData.totalLogged.toLocaleString()} contributions in{' '}
                      {selectedYear === currentYear ? 'the last year' : selectedYear}
                    </h2>
                    <p className="text-[11px] text-white/70">
                      Automatically logged when you complete or miss Lock Screen tasks
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Year Selector Pills */}
                    <div className="inline-flex rounded-full bg-black/20 border border-white/15 p-0.5">
                      {availableYears.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedYear(yr)}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                            selectedYear === yr
                              ? 'bg-white/25 text-white shadow-xs'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>

                    {/* Contribution Filter Menu */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                      >
                        <span>
                          {heatmapFilter === 'all'
                            ? 'All'
                            : heatmapFilter === 'onTime'
                            ? 'On-Time'
                            : 'Missed'}
                        </span>
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {settingsMenuOpen && (
                        <div
                          style={{
                            backgroundColor: 'rgba(18, 22, 32, 0.82)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                          }}
                          className="absolute right-0 mt-1.5 w-48 rounded-2xl border border-white/20 shadow-2xl p-1.5 z-30 text-xs"
                        >
                          {[
                            { id: 'all', label: 'All Activity' },
                            { id: 'onTime', label: 'Completed On-Time' },
                            { id: 'missed', label: 'Missed / Overdue' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setHeatmapFilter(opt.id);
                                setSettingsMenuOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between hover:bg-white/15 transition cursor-pointer"
                            >
                              <span>{opt.label}</span>
                              {heatmapFilter === opt.id && (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 53-Week Translucent Contribution Grid */}
                <div className="p-4 sm:p-5 overflow-x-auto">
                  <div className="min-w-[620px]">
                    {/* Month Labels Row (Jan .. Dec) */}
                    <div
                      className="grid gap-[3px] mb-1.5"
                      style={{
                        gridTemplateColumns: `repeat(${heatmapData.totalWeeks}, minmax(0, 1fr))`,
                      }}
                    >
                      {heatmapData.weeks.map((week) => (
                        <div
                          key={`month-${week.weekIndex}`}
                          className="text-[11px] text-white/75 leading-none overflow-visible whitespace-nowrap"
                        >
                          {week.monthLabel || ''}
                        </div>
                      ))}
                    </div>

                    {/* Weeks x 7 Days Matrix */}
                    <div
                      className="grid gap-[3px]"
                      style={{
                        gridTemplateColumns: `repeat(${heatmapData.totalWeeks}, minmax(0, 1fr))`,
                      }}
                    >
                      {heatmapData.weeks.map((week) => (
                        <div key={`week-${week.weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                          {week.days.map((day) => {
                            const isSelected = selectedDayKey === day.key;
                            return (
                              <button
                                key={day.key}
                                type="button"
                                disabled={day.isFuture || !day.inSelectedYear}
                                onClick={() => setSelectedDayKey(day.key)}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                style={getGitHubCellStyle(day)}
                                className={`w-full aspect-square max-w-[11px] rounded-[3px] border transition-transform ${
                                  isSelected && day.inSelectedYear
                                    ? 'ring-2 ring-white scale-125 z-10'
                                    : ''
                                } ${
                                  !day.isFuture && day.inSelectedYear ? 'cursor-pointer' : ''
                                }`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Legend & Hover Readout */}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/75">
                      <div>
                        {hoveredDay && hoveredDay.inSelectedYear ? (
                          <span>
                            <strong className="text-white">{hoveredDay.onTime} on-time</strong>
                            {hoveredDay.lateOrMissed > 0 && (
                              <>
                                {' '}
                                &{' '}
                                <strong className="text-rose-300">
                                  {hoveredDay.lateOrMissed} late/missed
                                </strong>
                              </>
                            )}{' '}
                            on{' '}
                            {hoveredDay.date.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        ) : selectedDayObj && selectedDayObj.inSelectedYear ? (
                          <span>
                            Selected:{' '}
                            <strong className="text-white">
                              {selectedDayObj.date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </strong>{' '}
                            — {selectedDayObj.onTime} on-time, {selectedDayObj.lateOrMissed}{' '}
                            missed/late
                          </span>
                        ) : (
                          <span>Hover or click any square to inspect daily completions</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="mr-1">Less</span>
                        {[
                          'rgba(255,255,255,0.09)',
                          'rgba(48, 209, 88, 0.35)',
                          'rgba(48, 209, 88, 0.58)',
                          'rgba(48, 209, 88, 0.80)',
                          'rgba(52, 199, 89, 0.98)',
                        ].map((rgba, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: rgba,
                              borderColor: 'rgba(255,255,255,0.22)',
                            }}
                            className="w-[10px] h-[10px] rounded-[2px] border inline-block"
                          />
                        ))}
                        <span className="ml-1">More</span>
                      </div>
                    </div>

                    {/* Interactive Selected Date Task History Inspector Card */}
                    {selectedDayObj && selectedDayObj.inSelectedYear && (
                      <div
                        style={glassSubtleStyle}
                        className="mt-4 p-4 rounded-2xl border space-y-3 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {selectedDayObj.date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            {selectedDayObj.isToday && (
                              <span className="px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-[10px] font-semibold text-emerald-300">
                                Today
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-300/35 text-emerald-200 font-medium">
                              {selectedDayObj.onTime} On-Time
                            </span>
                            {selectedDayObj.lateOrMissed > 0 && (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/25 border border-rose-300/35 text-rose-200 font-medium">
                                {selectedDayObj.lateOrMissed} Missed / Late
                              </span>
                            )}
                          </div>
                        </div>

                        {/* List of Exact Tasks Completed or Missed on the Clicked Date */}
                        {selectedDayObj.items && selectedDayObj.items.length > 0 ? (
                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {selectedDayObj.items.map((item) => {
                              const timeStr =
                                item.completedAt || item.timestamp
                                  ? new Date(
                                      item.completedAt || item.timestamp
                                    ).toLocaleTimeString('en-US', {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                    })
                                  : null;

                              return (
                                <div
                                  key={item.id}
                                  className="px-3 py-2 rounded-xl bg-black/25 hover:bg-black/35 border border-white/15 flex items-center justify-between gap-3 text-xs transition"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    {item.status === 'completed_on_time' && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    )}
                                    {item.status === 'completed_late' && (
                                      <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                                    )}
                                    {item.status === 'missed' && (
                                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                    )}

                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-medium text-white truncate">
                                          {item.title}
                                        </span>
                                      </div>
                                      {timeStr && (
                                        <span className="text-[11px] text-white/60">
                                          Logged at {timeStr}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                        item.status === 'completed_on_time'
                                          ? 'bg-emerald-500/20 border-emerald-300/35 text-emerald-200'
                                          : item.status === 'completed_late'
                                          ? 'bg-amber-500/20 border-amber-300/35 text-amber-200'
                                          : 'bg-rose-500/20 border-rose-300/35 text-rose-200'
                                      }`}
                                    >
                                      {item.status === 'completed_on_time'
                                        ? 'On-Time'
                                        : item.status === 'completed_late'
                                        ? 'Overdue'
                                        : 'Missed'}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRestoreHeatmapTask(selectedDayObj.key, item)
                                      }
                                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                                      title="Undo & restore task to Lock Screen"
                                    >
                                      <Undo2 className="w-3 h-3" />
                                      <span className="hidden sm:inline">Restore</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="py-3 text-center text-xs text-white/65 bg-black/15 rounded-xl border border-white/10">
                            No tasks completed or missed on this date. Click any green square to view past completed tasks!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* GitHub Repository & Lock Screen Deployment Modal */}
      {isGitHubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md">
          <div
            style={{
              backgroundColor: 'rgba(16, 20, 32, 0.85)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            }}
            className="max-w-2xl w-full rounded-3xl border border-white/25 shadow-2xl p-5 sm:p-6 text-white space-y-4 max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-white/10 border border-white/20">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    Create & Deploy on GitHub
                  </h3>
                  <p className="text-xs text-white/70">
                    Host your Apple-style Countdown Lock Screen on GitHub Pages for Mac, Windows & iPhone
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGitHubModalOpen(false)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${glassPillBtn}`}
              >
                Close
              </button>
            </div>

            {/* Step 1: Scaffold & Push to GitHub */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>1. Create Vite React Project & Push to GitHub</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCommand(
                      'step1',
                      `npm create vite@latest countdown-lockscreen -- --template react\ncd countdown-lockscreen\nnpm install lucide-react tailwindcss @tailwindcss/vite\n# Replace src/App.jsx with this Lock Screen code\ngit init && git add . && git commit -m "feat: Apple-style Countdown Lock Screen"\ngh repo create countdown-lockscreen --public --source=. --remote=origin --push`
                    )
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                >
                  {copiedSnippet === 'step1' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-2xl bg-black/45 border border-white/15 text-[11px] font-mono text-white/90 overflow-x-auto leading-relaxed select-all">
{`npm create vite@latest countdown-lockscreen -- --template react
cd countdown-lockscreen
npm install lucide-react tailwindcss @tailwindcss/vite
# Replace src/App.jsx with this Lock Screen code
git init && git add . && git commit -m "feat: Apple-style Countdown Lock Screen"
gh repo create countdown-lockscreen --public --source=. --remote=origin --push`}
              </pre>
            </div>

            {/* Step 2: Deploy to GitHub Pages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>2. Publish Live URL with GitHub Pages</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCommand(
                      'step2',
                      `npm install -D gh-pages\nnpx gh-pages -d dist`
                    )
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${glassPillBtn}`}
                >
                  {copiedSnippet === 'step2' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-2xl bg-black/45 border border-white/15 text-[11px] font-mono text-white/90 overflow-x-auto leading-relaxed select-all">
{`npm run build
npm install -D gh-pages
npx gh-pages -d dist`}
              </pre>
            </div>

            {/* Step 3: Running as a Transparent Lock Screen on Mac, Windows, and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div style={glassSubtleStyle} className="p-3 rounded-2xl border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Laptop className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Mac Overlay</span>
                </div>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  Paste your GitHub Pages URL into <strong>Plash</strong> (free on Mac App Store) or Safari <strong>Add to Dock</strong> with &ldquo;Pure Transparent&rdquo; wallpaper selected.
                </p>
              </div>

              <div style={glassSubtleStyle} className="p-3 rounded-2xl border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Monitor className="w-3.5 h-3.5 text-sky-300" />
                  <span>Windows Overlay</span>
                </div>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  Add your GitHub Pages URL into <strong>Lively Wallpaper</strong> or install as a frameless Edge/Chrome App with <strong>Keep Awake</strong> enabled.
                </p>
              </div>

              <div style={glassSubtleStyle} className="p-3 rounded-2xl border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Smartphone className="w-3.5 h-3.5 text-purple-300" />
                  <span>iPhone Lock / Standby</span>
                </div>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  Open your GitHub Pages URL in Safari, tap <strong>Share → Add to Home Screen</strong>, and switch to <strong>iPhone</strong> mode for full-screen Standby.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Bottom Apple Lock Screen Standby Pill */}
      <footer className="py-3 px-4 flex justify-center z-20">
        <div
          style={glassSubtleStyle}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs text-white/85"
        >
          <button
            type="button"
            onClick={() => setStandbyLockMode(!standbyLockMode)}
            className="inline-flex items-center gap-1.5 font-medium hover:text-white transition cursor-pointer"
          >
            {standbyLockMode ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-300" />
                <span>Show Controls</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-white/75" />
                <span>Hide Controls (Pure Lock Screen)</span>
              </>
            )}
          </button>
          <span className="text-white/40">•</span>
          <span className="text-[11px] text-white/75">
            Glass Opacity {glassAlpha}%
          </span>
        </div>
      </footer>
    </div>
  );
}