/**
 * Centralized icon exports.
 *
 * Purpose: the project previously imported icons directly from `lucide-react`.
 * `lucide-react` will be deprecated/changed in a future release, so we
 * centralize all icon imports here. To migrate later, update this single
 * file to re-export from the new package or provide a compatibility layer.
 */

export * from "lucide-react";

// Example migration note:
// If lucide moves to a new package (e.g. `lucide`), change the above
// line to: `export * from "lucide";`
