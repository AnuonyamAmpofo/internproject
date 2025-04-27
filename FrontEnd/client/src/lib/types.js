export const defaultAlarms = [
  {
    id: 1,
    time: "7:00 AM",
    label: "work out",
    isActive: true,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  },
  {
    id: 2,
    time: "8:00 AM",
    label: "cold Shower",
    isActive: true,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  },
  {
    id: 3,
    time: "8:20 AM",
    label: "Break fast",
    isActive: true,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  },
  {
    id: 4,
    time: "9:30 AM",
    label: "Iron",
    isActive: true,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  },
  {
    id: 5,
    time: "11:45 AM",
    label: "Feed the Dog",
    isActive: true,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  },
  {
    id: 6,
    time: "3:30 PM",
    label: "Go To Work",
    isActive: false,
    sound: "Dreamer",
    snooze: true,
    repeat: "Never"
  }
];

export const soundOptions = [
  { name: 'Default', isDefault: true },
  { name: 'Classic', isDefault: false },
  { name: 'Digital', isDefault: false },
  { name: 'Cosmic', isDefault: false },
  { name: 'Gentle', isDefault: false },
  { name: 'Dreamer', isDefault: false }
];

export const sounds = soundOptions.map(option => option.name);

export const repeatOptions = [
  'Never',
  'Every Day',
  'Every Week',
  'Every Month',
  'Custom'
];