import React, { useState } from 'react';
import { FeeRecord, Student, User } from '../../types';
import { Receipt, CheckCircle, Clock, AlertTriangle, CreditCard, Plus, X, Download } from 'lucide-react';

interface FeesModuleProps {
  fees: FeeRecord[];
  students: Student[];
  currentUser: User;
  onSaveFees: (updated: FeeRecord[]) => void;
}

export const FeesModule: React.FC<FeesModuleProps> = ({ fees, students, currentUser, onSaveFees }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('July 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    studentID: students[0]?.studentID || 'STU-1001',
    month: 'August 2026',
    amount: 8500,
    dueDate: '2026-08-10',
  });

  // Toggle fee status
  const handleTogglePaid = (feeID: string) => {
    onSaveFees(
      fees.map((f) => {
        if (f.feeID === feeID) {
          const isPaid = f.status === 'Paid';
          return {
            ...f,
            status: isPaid ? 'Pending' : 'Paid',
            paidDate: isPaid ? undefined : '2026-07-23',
          };
        }
        return f;
      })
    );
  };

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FeeRecord = {
      feeID: `FEE-${Math.floor(100 + Math.random() * 900)}`,
      studentID: newFee.studentID,
      month: newFee.month,
      amount: Number(newFee.amount),
      dueDate: newFee.dueDate,
      status: 'Pending',
    };
    onSaveFees([...fees, created]);
    setIsModalOpen(false);
  };

  // Filter fees based on role
  let displayFees = fees;
  if (currentUser.role === 'Student' || currentUser.role === 'Parent') {
    const studentID = currentUser.studentId || 'STU-1001';
    displayFees = fees.filter((f) => f.studentID === studentID);
  }

  const totalCollected = displayFees.filter((f) => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const totalPending = displayFees.filter((f) => f.status !== 'Paid').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-amber-600" />
            School Fees & Accounting Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage fee vouchers, payment tracking, tuition fee receipts & pending balances.
          </p>
        </div>

        {currentUser.role === 'Admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Fee Voucher</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Total Collected Fees</span>
            <h3 className="text-xl font-extrabold text-slate-900">PKR {totalCollected.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Total Pending Dues</span>
            <h3 className="text-xl font-extrabold text-amber-600">PKR {totalPending.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Active Month</span>
            <h3 className="text-base font-extrabold text-slate-900">{selectedMonth}</h3>
          </div>
        </div>
      </div>

      {/* Fee Vouchers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Fee Vouchers & Payment Status</h3>
          <span className="text-xs text-slate-500 font-medium">
            Total Records: {displayFees.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Voucher ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {displayFees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No fee records found.
                  </td>
                </tr>
              ) : (
                displayFees.map((f) => {
                  const student = students.find((s) => s.studentID === f.studentID);

                  const statusBadges = {
                    Paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    Pending: 'bg-amber-100 text-amber-800 border-amber-200',
                    Overdue: 'bg-red-100 text-red-800 border-red-200',
                  };

                  return (
                    <tr key={f.feeID} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{f.feeID}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        <div>{student ? student.name : f.studentID}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {student ? `${student.class} (${student.section})` : ''}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{f.month}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-900">
                        PKR {f.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{f.dueDate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${statusBadges[f.status]}`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleTogglePaid(f.feeID)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              f.status === 'Paid'
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                            }`}
                          >
                            {f.status === 'Paid' ? 'Mark Pending' : 'Mark Paid'}
                          </button>

                          <button
                            onClick={() => alert(`Downloading Fee Voucher Receipt #${f.feeID} for ${student?.name}...`)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                            title="Download PDF Voucher"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Fee Voucher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Generate Monthly Fee Voucher</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={newFee.studentID}
                  onChange={(e) => setNewFee({ ...newFee, studentID: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                >
                  {students.map((s) => (
                    <option key={s.studentID} value={s.studentID}>
                      {s.name} ({s.class}-{s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fee Month</label>
                  <input
                    type="text"
                    required
                    value={newFee.month}
                    onChange={(e) => setNewFee({ ...newFee, month: e.target.value })}
                    placeholder="e.g. August 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fee Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newFee.amount}
                    onChange={(e) => setNewFee({ ...newFee, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  required
                  value={newFee.dueDate}
                  onChange={(e) => setNewFee({ ...newFee, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs cursor-pointer"
                >
                  Issue Fee Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
