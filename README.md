# JCER Launchpad

PROJECT: JCER ADMISSION ERP – OFFICIAL LAUNCH CEREMONY

Build a fully functional, premium, interactive web application for the official launch ceremony of the JCER Admission ERP System.

This application will be used during a live official event at:

JAIN COLLEGE OF ENGINEERING & RESEARCH (JCER)

The experience must feel:

Professional

Formal

Premium

Cinematic

Institutional

Modern

Reliable for a live event

Do NOT create a normal landing page.

This is an interactive product launch ceremony system controlled remotely from a mobile phone and displayed on a large LED screen.

IMPORTANT ASSET INSTRUCTION

I have uploaded an image containing the exact JCER Digital Portal landing page.

Use this uploaded image as the official reveal background.

Critical requirement:

The uploaded JCER portal screenshot must:

Be completely hidden initially

Never be visible when the curtains are closed

Only become visible gradually when the curtains open

Remain clear and properly proportioned

Fill the entire 16:9 LED screen appropriately

Do not show any part of the screenshot before the reveal starts.

MAIN ERP WEBSITE

The actual live ERP website is:

https://jcererp-system.pages.dev/

After the launch animation is completed, the system must transition to this real website.

APPLICATION STRUCTURE

Build ONE application with TWO completely separate interfaces/routes.

Route 1

/screen

This is the large LED screen launch experience.

It will run fullscreen on a laptop connected to a projector or LED display.

Route 2

/controller

This is the mobile launch controller.

It will be used by the Principal to officially launch the system.

These two routes must communicate with each other in real time.

TECHNOLOGY REQUIREMENTS

Use:

React

TypeScript

Tailwind CSS

Framer Motion for animations

Supabase

Supabase Realtime

The application must be production-ready and responsive.

SUPABASE REALTIME ARCHITECTURE

Create a simple realtime launch control system.

Create a Supabase table called:

launch_control

Suggested structure:

ColumnTypeiduuidcommandtextsequence_idintegerupdated_attimestamp

The command values should support:

READY
LAUNCH
RESET

The system must synchronize between devices in real time.

Important:

When the controller sends:

LAUNCH

The /screen route must immediately start the launch animation.

When the controller sends:

RESET

The /screen route must return completely to the initial state.

Use Supabase Realtime subscriptions.

Do not use polling.

PREVENT DUPLICATE ANIMATION

This is extremely important.

The launch animation should run ONLY ONCE for every launch command.

Use sequence_id or a timestamp/event ID to prevent duplicate animation triggers.

Example:

sequence_id: 1
command: LAUNCH

The screen remembers the last processed sequence.

If the same realtime event is received again, do not restart the animation.

================================

BIG SCREEN EXPERIENCE

ROUTE: /screen

================================

This is the most important page.

Optimize it specifically for:

1920×1080

16:9 aspect ratio

LED screens

Projectors

Fullscreen presentation

Requirements:

No scrolling

No browser-style UI

No visible controls

Full viewport

Cinematic presentation

Smooth animations

High performance

INITIAL SCREEN – READY STATE

When /screen opens, show an elegant formal theatre stage.

The entire screen must initially be covered by a completely closed curtain.

CURTAIN DESIGN

Use:

Deep burgundy

Rich theatre red

Premium fabric appearance

Elegant folds

Subtle shadows

Realistic texture

The curtains should meet perfectly in the center.

CRITICAL:

The background screenshot must be 100% invisible.

No transparency.

No blur where the background becomes visible.

No gap between curtains.

The audience should feel that something important is hidden behind the curtain.

INITIAL TEXT ON CURTAIN

Display elegant formal text in the center.

Top:

JAIN COLLEGE OF ENGINEERING & RESEARCH

Main heading:

ADMISSION ERP SYSTEM

Below:

OFFICIAL LAUNCH CEREMONY

Use:

White typography

Subtle gold accents

Elegant spacing

Professional institutional styling

Add subtle decorative horizontal gold lines.

Do not overdesign.

Do not make it flashy.

It should resemble a formal product inauguration ceremony.

SUBTLE READY STATE ANIMATION

While waiting for launch:

Add extremely subtle ambient animation:

Slight curtain fabric movement

Soft spotlight effect

Very subtle floating particles

Do NOT reveal the background.

Do NOT use loud or distracting animation.

=====================================

LAUNCH SEQUENCE

=====================================

When the Principal presses LAUNCH on the mobile controller, automatically execute the entire sequence.

The Principal should only press ONE button.

No additional interaction required.

PHASE 1 – DIGITAL ACTIVATION

Duration:

Approximately 3 seconds.

The curtains must remain COMPLETELY CLOSED.

Do not reveal the portal background yet.

Show a sophisticated digital activation effect ON TOP OF THE CURTAIN.

Possible effects:

Blue/cyan energy pulse

Digital light travelling toward center

Expanding circular rings

Small particles

Subtle technological glow

Display text:

LAUNCH SEQUENCE INITIATED

The animation should feel:

Modern

Sophisticated

Elegant

Premium

Avoid:

Gaming effects

Excessive neon

Explosions

Cartoon effects

Use cinematic easing.

PHASE 2 – CURTAIN OPENING

After digital activation completes, begin opening the curtain.

Duration:

Approximately 6 seconds.

The curtain should open from the center.

Animation:

Left curtain:

Moves smoothly toward the left edge.

Right curtain:

Moves smoothly toward the right edge.

Use realistic theatre curtain movement.

Do not simply fade curtains away.

The curtains must physically slide/open.

Use premium easing.

For example:

easeInOut
or
custom cinematic cubic-bezier

IMPORTANT BACKGROUND REVEAL

Behind the curtain, use the uploaded JCER Digital Portal screenshot.

As the curtains open:

The screenshot should gradually become visible naturally through the opening gap.

The screenshot must remain static.

Do NOT animate the screenshot.

Do NOT zoom unnecessarily.

Do NOT use iframe during curtain opening.

The screenshot should look like the actual website is behind the curtains.

CURTAIN OPENING VISUAL

The experience should visually feel like:

START

████████████████████
████ CURTAIN ███████

        ↓

██████          ████
██████  PORTAL  ████
██████          ████

        ↓

██                  ██
██   JCER PORTAL     ██
██                  ██

        ↓

FULL PORTAL REVEAL

The opening must be smooth and cinematic.

PHASE 3 – FULL PORTAL REVEAL

When curtains are completely open:

Keep the portal screenshot fully visible.

The curtains should remain at the far left and far right edges or smoothly disappear beyond the viewport.

Wait approximately 1 second.

Then show a professional launch overlay.

PHASE 4 – OFFICIAL LAUNCH ANNOUNCEMENT

Display a premium cinematic overlay.

Use a subtle dark transparent overlay over the portal screenshot.

Center content:

ADMISSION ERP SYSTEM

OFFICIALLY LAUNCHED

JAIN COLLEGE OF ENGINEERING & RESEARCH

Optional tagline:

Empowering Digital Admissions

Use:

White

Subtle gold

Institutional navy accents

Add very subtle:

Light particles

Soft glow

Elegant light sweep

Do NOT use:

Confetti

Cartoon celebration

Party emojis

Fireworks

This is a formal academic institution launch.

Duration:

Approximately 3 seconds.

PHASE 5 – LIVE WEBSITE TRANSITION

After the "OFFICIALLY LAUNCHED" overlay fades away:

The audience should transition to the real Admission ERP website:

https://jcererp-system.pages.dev/

IMPORTANT TRANSITION REQUIREMENT

Do NOT immediately redirect suddenly.

The transition should be seamless.

Recommended approach:

Keep the screenshot visible.

Begin loading the live website.

Wait until it is ready.

Smoothly fade the screenshot.

Reveal the live website.

The audience should ideally NOT notice the transition.

Because the screenshot visually represents the landing page, the transition should appear natural.

LIVE WEBSITE IMPLEMENTATION

Attempt to load the live website in a full-screen iframe underneath or above the screenshot only after the reveal.

The iframe should be:

position: fixed;
width: 100%;
height: 100%;
border: none;

Initially keep it invisible.

Once fully loaded:

Fade opacity from:

0 → 1

Simultaneously fade screenshot:

1 → 0

If iframe embedding is blocked by security restrictions, provide a graceful fallback:

After the launch overlay completes, navigate the entire browser to:

https://jcererp-system.pages.dev/

But first attempt the seamless iframe transition.

================================

MOBILE CONTROLLER

ROUTE: /controller

================================

This page will be opened on the Principal's mobile phone.

It must be completely different from the LED screen UI.

The interface should feel like an elegant Official Launch Control Panel.

Optimize for:

Mobile

Touch interaction

Large buttons

Simple interface

No technical complexity

MOBILE DESIGN

Use:

Deep navy background

White cards

JCER blue

Subtle gold accents

Add a professional header.

Display:

JAIN COLLEGE OF ENGINEERING & RESEARCH

Then:

JCER ADMISSION ERP

Subtitle:

Official Launch Control

CONNECTION STATUS

Display a small connection indicator.

Example:

🟢

SYSTEM READY

Text:

Launch Screen Connected

Do not make this overly technical.

MAIN LAUNCH BUTTON

Create ONE large premium button.

Text:

LAUNCH SYSTEM

The button must:

Be large

Easy to press

Clearly visible

Premium

Have subtle glow

Have a confirmation interaction

Before triggering, show a confirmation modal:

Confirm Official Launch

Are you ready to launch the JCER Admission ERP System?

Buttons:

Cancel

🚀 Launch Now

This prevents accidental launch.

AFTER LAUNCH BUTTON CLICK

When confirmed:

Send realtime command LAUNCH

Increment sequence_id

Disable Launch button

Update UI status

Display:

LAUNCH IN PROGRESS

Show a subtle progress animation.

The controller should not allow multiple Launch commands.

AFTER LAUNCH COMPLETES

After approximately the total animation duration:

Show:

✓

SYSTEM OFFICIALLY LAUNCHED

Status:

Live ERP Portal Active

The Launch button should remain disabled until Reset.

================================

SIDEBAR / MENU

================================

Add a professional hamburger menu.

When opened, show:

🚀 Launch Control

Return to main screen.

🔄 Reset Ceremony

Reset the entire ceremony.

📡 System Status

Show system connectivity.

RESET FUNCTION

This is extremely important.

When user clicks:

RESET CEREMONY

Show confirmation modal.

Text:

Are you sure you want to reset the official launch ceremony?

This will return the launch screen to its initial state.

Buttons:

Cancel

Reset Ceremony

When confirmed:

Send realtime command:

RESET

The big screen must:

Stop any active animation.

Cancel pending animation timers.

Hide live website layer.

Restore portal screenshot behind curtain.

Move curtains back to completely closed.

Hide activation effects.

Hide launch overlay.

Return to initial formal curtain screen.

Display ceremony title again.

Mobile should return to:

🟢 SYSTEM READY

And re-enable:

LAUNCH SYSTEM

The ceremony must be fully repeatable.

SYSTEM STATUS PAGE

Create a simple professional status view.

Show:

SystemStatusMobile ControllerConnectedLaunch ScreenConnected / WaitingRealtime ConnectionActiveCeremony StatusReady / Launching / Completed

Use simple colored indicators.

This will help the technical team before the event.

CONNECTION PRESENCE

Implement a basic heartbeat/presence mechanism if possible.

When /screen is open:

Update screen presence.

The mobile controller should know whether the launch screen is connected.

Example:

🟢 Launch Display Connected

or

🔴 Launch Display Not Connected

This is useful before giving the phone to the Principal.

KEYBOARD BACKUP CONTROLS

For emergency backup during the event, implement hidden keyboard controls ONLY on /screen.

Keyboard:

SPACE → Start Launch
R → Reset Ceremony

Do not show these instructions to the audience.

These are emergency controls for the technical team.

STATE MANAGEMENT

The screen should internally manage these states:

READY
ACTIVATING
OPENING_CURTAIN
REVEAL
OFFICIALLY_LAUNCHED
LIVE

Recommended sequence:

READY
   ↓
ACTIVATING
   ↓
OPENING_CURTAIN
   ↓
REVEAL
   ↓
OFFICIALLY_LAUNCHED
   ↓
LIVE

Reset from ANY state must return to:

READY

ANIMATION TIMELINE

Use approximately this timing:

0 sec
READY STATE

Principal presses Launch
        ↓

0–3 sec
DIGITAL ACTIVATION

        ↓

3–9 sec
CURTAIN OPENING

        ↓

9–10 sec
FULL PORTAL REVEAL

        ↓

10–13 sec
OFFICIALLY LAUNCHED OVERLAY

        ↓

13–15 sec
SEAMLESS TRANSITION TO LIVE WEBSITE

Total experience:

Approximately 15 seconds.

Make timings configurable through constants.

DESIGN REQUIREMENTS

The entire application should communicate:

Innovation

Digital transformation

Education

Prestige

Professionalism

Color palette

Primary:

Deep Navy
#0B1F3A

Institutional Blue:

#1E4E8C

Gold Accent:

#C9A227

Curtain Burgundy:

#6E0D19

Supporting:

White
Soft Gray

Do not excessively use gradients.

TYPOGRAPHY

Use elegant professional fonts.

Suggested:

Inter

Manrope

Montserrat

Headings should be bold and authoritative.

Avoid overly decorative fonts.

PERFORMANCE REQUIREMENTS

This will run during a LIVE event.

Optimize for reliability.

Requirements:

No unnecessary API calls

No heavy external dependencies

Smooth 60fps animations where possible

GPU-friendly transforms

Avoid layout shifts

Preload uploaded screenshot

Preload curtain assets

Handle reconnection

Clean up animation timers

Prevent duplicate realtime events

RESPONSIVENESS

/screen

Optimize primarily for:

1920 × 1080
16:9

Also gracefully handle other landscape screens.

/controller

Optimize primarily for:

Mobile devices
360px – 430px width

PROJECT STRUCTURE

Organize code professionally.

Suggested structure:

src/
│
├── pages/
│   ├── LaunchScreen.tsx
│   ├── Controller.tsx
│   └── Status.tsx
│
├── components/
│   ├── Curtain.tsx
│   ├── ActivationEffect.tsx
│   ├── LaunchOverlay.tsx
│   ├── PortalReveal.tsx
│   ├── LaunchButton.tsx
│   ├── ResetDialog.tsx
│   └── StatusIndicator.tsx
│
├── hooks/
│   ├── useLaunchState.ts
│   └── useRealtimeControl.ts
│
├── services/
│   └── supabase.ts
│
├── assets/
│   └── jcer-portal-reveal.png
│
└── App.tsx

Keep code modular and maintainable.

FINAL EXPERIENCE

The complete experience should work exactly like this:

                         📱
              PRINCIPAL'S MOBILE
                         │
                         │
                  Presses LAUNCH
                         │
                         ▼
                SUPABASE REALTIME
                         │
                         ▼
                  🖥️ BIG SCREEN


        🎭 COMPLETELY CLOSED CURTAIN
                         │
                         ▼
              ⚡ DIGITAL ACTIVATION
                         │
                         ▼
             🎭 CURTAINS OPEN SLOWLY
                         │
                         ▼
         🖼️ JCER PORTAL SCREENSHOT REVEAL
                         │
                         ▼
          🚀 ADMISSION ERP SYSTEM
             OFFICIALLY LAUNCHED
                         │
                         ▼
             🌐 LIVE ERP WEBSITE

MOST IMPORTANT FINAL INSTRUCTIONS

This must NOT be a static UI mockup.

Build a fully functional interactive application.

Required working features:

/screen route

/controller route

Supabase database integration

Supabase Realtime synchronization

Working Launch button

Launch confirmation

Working Reset button

Reset confirmation

Duplicate trigger prevention

Curtain animation

Digital activation animation

Portal screenshot reveal

Official launch overlay

Live ERP transition

Connection status

Emergency keyboard controls

Responsive mobile controller

Fullscreen LED screen experience

VISUAL PRIORITY

Make the /screen experience look like a high-budget professional product unveiling ceremony, appropriate for an official college event.

It must be elegant and formal.

Do not create a generic dashboard.
Do not create a simple landing page.
Do not create a static prototype.

Build the complete interactive launch ceremony application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/056fc4da-eef2-402f-b899-7a9634806621).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
