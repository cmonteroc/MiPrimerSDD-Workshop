# Data Model

## Task

| Field | Type | Required | Rules |
|---|---|---|---|
| id | String | Yes | Unique within the local collection |
| title | String | Yes | Non-empty after trimming surrounding whitespace |
| description | String | No | Empty string represents no description |
| status | String | Yes | Exactly `pending` or `done` |

## Lifecycle

1. Creation sets `status = pending`.
2. Status changes transition either `pending -> done` or `done -> pending`.
3. Edit changes title and description while preserving identity and status.
4. Confirmed deletion removes the task.

## Persistence representation

The persistence module serializes the collection to JSON. It reports read and write failures as operation
results rather than presenting them as successful writes. A change is saved only after confirmed storage
completion.

## Validation rules

- Reject titles whose trimmed value is empty.
- Preserve task identity across edits and status changes.
- Preserve description and status on operations that do not change them.
- Do not impose unspecified title or description length limits.
