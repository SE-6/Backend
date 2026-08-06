using System.ComponentModel.DataAnnotations;

namespace BlogApi.Filters;

public sealed class ValidationFilter<T> : IEndpointFilter where T : class
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)

    {
        // 1. Find the DTO among the endpoionts arguments
        var dto = context.Arguments.OfType<T>().FirstOrDefault();

        if (dto is null)
        {
            return Results.BadRequest(new { error = "Missing request body" });
        }

        // 2. run the data-annotation validation

        var results = new List<ValidationResult>();
        var validationContext = new ValidationContext(dto);
        bool isValid = Validator.TryValidateObject(dto, validationContext, results, true);

        // 3. If invalid, STOP here and return the errors (never reach the handler)
        if (!isValid)
        {
            var erros = results
            .GroupBy(r => r.MemberNames.FirstOrDefault() ?? string.Empty)
            .ToDictionary(
                g => g.Key,
                g => g.Select(r => r.ErrorMessage ?? "Invalid").ToArray()
            );

            return Results.ValidationProblem(erros);
        }

        // 4. All good? => let the endpoin run
        return await next(context);
    }
}