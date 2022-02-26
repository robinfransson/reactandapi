using Backend.Models;
using Backend.Models.Interfaces;
using Backend.Validators;
using Database;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
});
builder.Services.AddEntityFrameworkSqlite().AddDbContextFactory<LocalDbContext>();

builder.Services.AddTransient<CreateUserValidator>();
builder.Services.AddTransient<IUserService,UserService>();
builder.Services.AddFluentValidation();
var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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
    policy.WithHeaders("Content-Type");
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();
