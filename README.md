# Lead Report Handler

A streamlined React application designed to help sales and support agents track their efficiency, manage daily call metrics, and generate standardized reports.

## Overview

This tool simplifies the process of tracking call outcomes during a shift. Instead of manual tallying, users can update counters in real-time, manage a Do Not Call Registry (DNCR) list, and instantly generate a formatted text report for submission at the end of the day.

## Features

- **Real-Time Counters**: Easily track various call outcomes (New Call, Follow Up, Wrong Number, etc.) using `+1` / `-1` buttons or direct input.
- **Smart Calculations**:
  - Automatically calculates "No Answer" based on the Total Leads subtracted by other specific outcomes.
  - Aggregates "Total Answered" calls.
- **DNCR Management**: Dedicated input to add names to a "Do Not Call Registry" list, which updates the count and appends the name to a specific report section.
- **Data Persistence**: Uses Browser LocalStorage to save your counts automatically. You won't lose your data if you accidentally refresh or close the tab.
- **Instant Reporting**: Generates a formatted summary and a separate DNCR list with one click, ready for copy-pasting.

## How to Use

### 1. Start of Shift

- **Total Leads**: Enter the total number of leads assigned to you in the top input field.

### 2. During Shift (Tracking)

As you work through your leads, use the counters to track the outcome of each call:

- **CalcFiled Controls**:
  - Click **+1** (Green) to increment a count.
  - Click **-1** (Red) to decrement if you made a mistake.
  - You can also type a number directly into the input box.

**Call Categories:**

- **New Call**: First contact attempt.
- **Follow Up**: Returning contact.
- **Wrong Number**: Invalid contact number.
- **Gatekeeper**: Spoke to an assistant/receptionist.
- **Wrong Data**: Incorrect lead information.
- **Qualified**: Lead is interested/verified.
- **Not Qualified**: Lead rejected or not suitable.
- **DNCR**: User requested "Do Not Call".

### 3. Managing DNCR

If a user asks to be added to the Do Not Call Registry:

1. Locate the **DNCR Input** field (near the "Add" button).
2. Type the person's name.
3. Click **Add** or press Enter.
   - This automatically increases the DNCR count by 1.
   - Adds the name to the internal DNCR list.

### 4. Viewing Stats

- **No Answer**: This number updates automatically. It represents `Total Leads` minus the sum of (Wrong Number + Follow Up + New Call + Gatekeeper + Wrong Data).

### 5. End of Shift (Reporting)

1. Click the **Report** button at the bottom.
2. Two panels will appear:
   - **Generated Report**: The numerical breakdown of your shift.
   - **DNCR List**: A numbered list of all names added to the DNCR.
3. Copy the text from these panels to your reporting platform (Slack, Email, etc.).

### 6. Resetting

- Click **Reset** to clear all counts, lists, and inputs to zero for a fresh start. **Warning**: This action cannot be undone.

## Installation & Setup

If you want to run this project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd LeadReportHandler
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Technologies Used

- **React**: UI Component library.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
