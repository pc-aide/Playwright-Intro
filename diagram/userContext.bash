                    ┌──────────────────────────┐
                    │        Browser            │
                    │  (chromium / firefox /   │
                    │        webkit)            │
                    └────────────┬─────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
┌──────────────────────────┐      ┌──────────────────────────┐
│    BrowserContext #1     │      │    BrowserContext #2     │
│  (profil isolé complet)  │      │  (profil isolé complet)  │
│                          │      │                          │
│  Storage (cookies, LS,   │      │  Storage (cookies, LS,   │
│  cache, sessions, etc.)  │      │  cache, sessions, etc.)  │
│                          │      │                          │
│  ┌───────────────────┐   │      │  ┌───────────────────┐   │
│  │      Page A       │   │      │  │      Page B       │   │
│  │  /cart            │   │      │  │  /cart            │   │
│  │  admin/admin123   │   │      │  │ naveen/naveen123  │   │
│  └───────────────────┘   │      │  └───────────────────┘   │
└──────────────────────────┘      └──────────────────────────┘
