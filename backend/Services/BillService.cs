using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class BillService
{
    private readonly ApplicationContext _context;

    public BillService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Bill> AddBillAsync(AddBillDto dto, Guid userId)
    {
        var bill = new Bill
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            BillingMonth = dto.BillingMonth,
            DueDate = dto.DueDate,
            GenerationAmount = dto.GenerationAmount,
            TransmissionAmount = dto.TransmissionAmount,
            DistributionAmount = dto.DistributionAmount,
            GovernmentTaxAmount = dto.GovernmentTaxAmount,
            EnergyKwh = dto.EnergyKwh,
            TotalAmount = dto.TotalAmount,
            Status = dto.Status
        };

        await _context.Bills.AddAsync(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<List<Bill>> GetUserBillsAsync(Guid userId)
    {
        return await _context.Bills
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.BillingMonth)
            .ToListAsync();
    }

    public async Task<Bill?> UpdateBillAsync(Guid billId, EditBillDto dto, Guid userId)
    {
        var existingBill = await _context.Bills.FindAsync(billId);

        if (existingBill == null || existingBill.UserId != userId)
        {
            return null;
        }

        existingBill.BillingMonth = dto.BillingMonth ?? existingBill.BillingMonth;
        existingBill.DueDate = dto.DueDate ?? existingBill.DueDate;
        existingBill.GenerationAmount = dto.GenerationAmount ?? existingBill.GenerationAmount;
        existingBill.TransmissionAmount = dto.TransmissionAmount ?? existingBill.TransmissionAmount;
        existingBill.DistributionAmount = dto.DistributionAmount ?? existingBill.DistributionAmount;
        existingBill.GovernmentTaxAmount = dto.GovernmentTaxAmount ?? existingBill.GovernmentTaxAmount;
        existingBill.EnergyKwh = dto.EnergyKwh ?? existingBill.EnergyKwh;
        existingBill.TotalAmount = dto.TotalAmount ?? existingBill.TotalAmount;
        existingBill.Status = dto.Status ?? existingBill.Status;

        _context.Bills.Update(existingBill);
        await _context.SaveChangesAsync();

        return existingBill;
    }

    public async Task<bool> DeleteBillAsync(Guid billId, Guid userId)
    {
        var existingBill = await _context.Bills.FindAsync(billId);

        if (existingBill == null || existingBill.UserId != userId)
        {
            return false;
        }

        _context.Bills.Remove(existingBill);
        await _context.SaveChangesAsync();
        return true;
    }
}