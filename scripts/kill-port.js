#!/usr/bin/env node

/**
 * Script to kill a process running on a specific port
 * Usage: node scripts/kill-port.js [port]
 */

const port = process.argv[2] || 3000;
const { exec } = require('child_process');
const os = require('os');

const platform = os.platform();

let command;

if (platform === 'win32') {
  // Windows
  command = `netstat -ano | findstr :${port}`;
  exec(command, (error, stdout, stderr) => {
    if (error || !stdout) {
      console.log(`No process found on port ${port}`);
      return;
    }
    
    const lines = stdout.trim().split('\n');
    const pids = new Set();
    
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid)) {
        pids.add(pid);
      }
    });
    
    if (pids.size === 0) {
      console.log(`No process found on port ${port}`);
      return;
    }
    
    console.log(`Found processes on port ${port}: ${Array.from(pids).join(', ')}`);
    pids.forEach(pid => {
      exec(`taskkill /PID ${pid} /F`, (err) => {
        if (err) {
          console.error(`Failed to kill process ${pid}:`, err.message);
        } else {
          console.log(`✓ Killed process ${pid}`);
        }
      });
    });
  });
} else {
  // macOS/Linux
  command = `lsof -ti:${port}`;
  exec(command, (error, stdout, stderr) => {
    if (error || !stdout) {
      console.log(`No process found on port ${port}`);
      return;
    }
    
    const pids = stdout.trim().split('\n').filter(Boolean);
    if (pids.length === 0) {
      console.log(`No process found on port ${port}`);
      return;
    }
    
    console.log(`Found processes on port ${port}: ${pids.join(', ')}`);
    pids.forEach(pid => {
      exec(`kill -9 ${pid}`, (err) => {
        if (err) {
          console.error(`Failed to kill process ${pid}:`, err.message);
        } else {
          console.log(`✓ Killed process ${pid}`);
        }
      });
    });
  });
}
