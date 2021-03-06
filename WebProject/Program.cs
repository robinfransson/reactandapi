using Backend.Helpers;
using Backend.Models;
using Backend.Models.Interfaces;
using Backend.Services;
using Backend.Validators;
using Database;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
});
builder.Services.AddEntityFrameworkSqlite()
                .AddDbContextFactory<LocalDbContext>();

builder.Services.AddTransient<CreateUserValidator>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRoleManager, RoleManager>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddFluentValidation();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}




app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebProject v1"));
}
app.UseCors((policy) =>
{
    policy.WithOrigins("http://localhost:3000");
    policy.WithHeaders("Content-Type")
          .WithHeaders("Auth-token")
          .WithHeaders("Access-Control-Allow-Origin");
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();
