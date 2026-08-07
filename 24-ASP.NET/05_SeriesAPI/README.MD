```text
SeriesApi/
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
├── Models/
│   └── Series.cs
├── Dtos/
│   ├── CreateSeriesDto.cs
│   ├── UpdateSeriesDto.cs
│   └── SeriesResponseDto.cs
├── Filters/
│   ├── ValidationFilter.cs
│   └── ValidationExtensions.cs
├── Infrastructure/
│   └── ApplicationDbContext.cs
├── Services/
│   ├── Interfaces/
│   │   └── ISeriesService.cs
│   └── SeriesService.cs
└── Endpoints/
    └── SeriesEndpoints.cs
```

EF Core core + the **PostgreSQL provider** (not SQLite this time)

```bash
dotnet package add Microsoft.EntityFrameworkCore
dotnet package add Npgsql.EntityFrameworkCore.PostgreSQL
dotnet package add Microsoft.EntityFrameworkCore.Design
dotnet package add Microsoft.AspNetCore.OpenApi
dotnet package add Scalar.AspNetCore

# dotnet tool update --global dotnet-ef
```
