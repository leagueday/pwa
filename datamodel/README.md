# datamodel

## load sequence

### Home

1. Initial 
    1. If `is-user-authenticated` load `User[email_address]` (U)
    2. Load `ViewFacets[Home]` (F1)
    3. Load `GlobalChannels` (C1)
2. Channels
    1. Load `Channel` for all C1, U.C (F2)
3. Facets
    1. Load `Facet` for all F1, F2 (P1)
4. Podcasts
    1. Load `Podcast` for all P1, U.P
