# EF Core Commands

## Core packages

```bash
dotnet package add Microsoft.EntityFrameworkCore
dotnet package add Microsoft.EntityFrameworkCore.Design
```

## SQLite provider

```bash
dotnet package add Microsoft.EntityFrameworkCore.Sqlite
```

## PostgreSQL provider

```bash
dotnet package add Npgsql.EntityFrameworkCore.PostgreSQL
```

## Local EF tool setup

```bash
dotnet new tool-manifest
dotnet tool install dotnet-ef
```

## Restore after cloning

```bash
dotnet restore
dotnet tool restore
dotnet ef database update
```

## Create a migration

```bash
dotnet ef migrations add InitialCreate
dotnet ef migrations add MigrationName
```

## Apply migrations

```bash
dotnet ef database update
```

## List migrations

```bash
dotnet ef migrations list
```

## Remove the latest unapplied migration

```bash
dotnet ef migrations remove
```

## Run the application

```bash
dotnet watch run
```
