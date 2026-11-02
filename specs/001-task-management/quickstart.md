# Quickstart and Validation Plan

## Prerequisites

- Node.js 18.20 or newer
- A modern desktop or mobile browser

## Planned package scripts

```text
npm start
npm test
```

`npm start` will start the local static server. `npm test` will execute `node --test`.

## Planned validation scenarios

1. Start locally and open the application URL.
2. Verify both screens, filters, Add task, and empty states.
3. Create tasks with and without descriptions.
4. Reject empty and whitespace-only titles.
5. Edit a task and cancel unsaved changes.
6. Toggle status and apply the active filter on Back navigation.
7. Cancel deletion and verify the task remains.
8. Confirm deletion, return to the list, and verify removal.
9. Close and reopen the application and verify retained data.
10. Simulate persistence failure and verify no saved confirmation is shown.
11. Verify responsive layout and 44-by-44-pixel controls after DEC-003 is resolved.
12. Verify normal and large text contrast ratios when the approved visual values are defined.

## Usability evidence tasks

- SC-001 requires a participant test for creating a valid task and opening its detail within two minutes without assistance, with at least 90% completion and recorded method, participants, results, date, and limitations.
- SC-002 requires a participant test for changing status and locating it in the matching filter within one minute without assistance, with at least 90% completion and the same evidence fields.
- SC-003 requires a participant test for editing and deleting through confirmation within two minutes without assistance, with at least 90% completion and the same evidence fields.

## Evidence policy

This plan does not claim that scenarios passed. Results require recorded command output or observed
browser evidence. Usability criteria require a separate test with participants, method, completion
results, date, limitations, and recorded outcomes.

## Recorded automated verification

- Date: 2026-11-02.
- Command: `npm.cmd test`.
- Result: 15 tests passed, 0 failed.
- Server smoke verification: `/` and `/app.js` returned HTTP 200 at `http://localhost:8080`.
- Integration and acceptance coverage executed for application chrome, navigation contracts, persistence and observable scope.
- Browser interaction, participant usability, desktop/mobile visual review and WCAG inspection remain pending.
