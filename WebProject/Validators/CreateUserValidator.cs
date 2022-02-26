using Backend.Models;
using FluentValidation;

namespace Backend.Validators;

public class CreateUserValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email address is not valid.");
        RuleFor(x => x.Username)
            .Length(5)
            .WithMessage("Username needs to be 5 letters long.");
        RuleFor(x => x.Password)
            .Length(5)
            .WithMessage("Password needs to be 5 letters long.");
    }
}