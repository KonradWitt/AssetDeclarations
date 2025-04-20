using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Services.DatabaseServices;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options => { options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });
builder.Services.AddScoped<IPersonDataService, PersonDataService>();
builder.Services.AddScoped<IAssetDeclarationDataService, AssetDeclarationDataService>();

builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options => options.AddPolicy("LocalPolicy", policy => { policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader(); }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options => { options.WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient); });
    app.UseCors("LocalPolicy");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
