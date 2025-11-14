import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ParsedFields {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  month: string;
  dayOfWeek: string;
}

interface DayOfWeek {
  name: string;
  selected: boolean;
  value: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cron-project');
  
  // Cron Expression Evaluator
  cronExpression = '0 */5 * * * *';
  parsedFields: ParsedFields = {
    seconds: '',
    minutes: '',
    hours: '',
    days: '',
    month: '',
    dayOfWeek: ''
  };

  // Recurrence Pattern Generator
  selectedPattern = 'Daily';
  dailyTime = '12:00';
  weeklyTime = '01:00';
  monthlyTime = '01:00';
  selectedDayOfMonth = 17;
  generatedDescription = 'Runs every day at 12:00.';

  daysOfWeek: DayOfWeek[] = [
    { name: 'Monday', selected: true, value: 1 },
    { name: 'Tuesday', selected: false, value: 2 },
    { name: 'Wednesday', selected: false, value: 3 },
    { name: 'Thursday', selected: false, value: 4 },
    { name: 'Friday', selected: false, value: 5 },
    { name: 'Saturday', selected: false, value: 6 },
    { name: 'Sunday', selected: false, value: 0 }
  ];

  daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  constructor() {
    this.parseCronExpression();
    this.generateDescription();
  }

  parseCronExpression(): void {
    if (!this.cronExpression.trim()) {
      this.resetParsedFields();
      return;
    }

    const parts = this.cronExpression.trim().split(/\s+/);
    
    if (parts.length === 6) {
      // Standard 6-field format: seconds minutes hours day month dayOfWeek
      this.parsedFields = {
        seconds: parts[0] || '',
        minutes: parts[1] || '',
        hours: parts[2] || '',
        days: parts[3] || '',
        month: parts[4] || '',
        dayOfWeek: parts[5] || ''
      };
    } else if (parts.length === 5) {
      // 5-field format (no seconds): minutes hours day month dayOfWeek
      this.parsedFields = {
        seconds: '0',
        minutes: parts[0] || '',
        hours: parts[1] || '',
        days: parts[2] || '',
        month: parts[3] || '',
        dayOfWeek: parts[4] || ''
      };
    } else {
      this.resetParsedFields();
    }
  }

  private resetParsedFields(): void {
    this.parsedFields = {
      seconds: '',
      minutes: '',
      hours: '',
      days: '',
      month: '',
      dayOfWeek: ''
    };
  }

  onPatternChange(): void {
    this.generateDescription();
  }

  generateDescription(): void {
    switch (this.selectedPattern) {
      case 'Daily':
        this.generateDailyDescription();
        break;
      case 'Weekly':
        this.generateWeeklyDescription();
        break;
      case 'Monthly':
        this.generateMonthlyDescription();
        break;
      default:
        this.generatedDescription = '';
    }
  }

  private generateDailyDescription(): void {
    const time = this.formatTime(this.dailyTime);
    this.generatedDescription = `Runs every day at ${time}.`;
  }

  private generateWeeklyDescription(): void {
    const selectedDays = this.daysOfWeek
      .filter(day => day.selected)
      .map(day => day.name);
    
    if (selectedDays.length === 0) {
      this.generatedDescription = 'Please select at least one day of the week.';
      return;
    }

    const time = this.formatTime(this.weeklyTime);
    
    if (selectedDays.length === 1) {
      this.generatedDescription = `Runs every week on ${selectedDays[0]} at ${time}.`;
    } else if (selectedDays.length === 2) {
      this.generatedDescription = `Runs every week on ${selectedDays.join(' and ')} at ${time}.`;
    } else {
      const lastDay = selectedDays.pop();
      this.generatedDescription = `Runs every week on ${selectedDays.join(', ')} and ${lastDay} at ${time}.`;
    }
  }

  private generateMonthlyDescription(): void {
    const time = this.formatTime(this.monthlyTime);
    const dayWithSuffix = this.addOrdinalSuffix(this.selectedDayOfMonth);
    this.generatedDescription = `Runs every month on the ${dayWithSuffix} at ${time}.`;
  }

  private formatTime(time: string): string {
    if (!time) return '00:00';
    
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  private addOrdinalSuffix(day: number): string {
    const j = day % 10;
    const k = day % 100;
    
    if (j === 1 && k !== 11) {
      return day + 'st';
    }
    if (j === 2 && k !== 12) {
      return day + 'nd';
    }
    if (j === 3 && k !== 13) {
      return day + 'rd';
    }
    return day + 'th';
  }
}
