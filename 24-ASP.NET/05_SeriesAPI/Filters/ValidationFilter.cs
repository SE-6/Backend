using System.ComponentModel.DataAnnotations;

namespace SeriesApi.Filters;

public sealed class ValidationFilter<T> : IEndpointFilter where T : class
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)

    {
        // STEP 1 => find our DTO among the endpoints arguments
        var dto = context.Arguments.OfType<T>().FirstOrDefault();
        if (dto is null)
            return Results.BadRequest(new { error = "Missing request body" });

        // STEP 2 run the check
        var results = new List<ValidationResult>();
        var ctx = new ValidationContext(dto);
        bool isValid = Validator.TryValidateObject(dto, ctx, results, true);

        // STEP 3 if invalid: reshape the erros
        if (!isValid)
        {
            var errors = results
            .GroupBy(r => r.MemberNames.FirstOrDefault() ?? string.Empty)
            .ToDictionary(
                g => g.Key,
                g => g.Select(r => r.ErrorMessage ?? "Invalid").ToArray()
            );
            return Results.ValidationProblem(errors);
        }

        // STEP 4: valid => continue to the actual endpoint handler
        return await next(context);
    }
}