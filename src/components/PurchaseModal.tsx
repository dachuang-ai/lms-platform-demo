/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, Ticket, Sparkles, CheckCircle2, ChevronRight, FileSpreadsheet, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { Course, MembershipPlan } from '../types';

interface PurchaseModalProps {
  item: Course | MembershipPlan;
  type: 'course' | 'plan';
  onClose: () => void;
  onSuccess: (itemId: string, type: 'course' | 'plan') => void;
}

export default function PurchaseModal({ item, type, onClose, onSuccess }: PurchaseModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: Gateway Simulation, 3: Success Receipt
  
  // Pricing calculation
  const originalPrice = type === 'course' ? (item as Course).price : (item as MembershipPlan).price;
  const [discountCode, setDiscountCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // overall dollar amount off
  const [finalPrice, setFinalPrice] = useState(originalPrice);

  // Billing configurations
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'linepay' | 'applepay'>('card');
  const [invoiceType, setInvoiceType] = useState<'individual' | 'corporate'>('individual');
  const [corporateTaxId, setCorporateTaxId] = useState('');
  const [personalCarrier, setPersonalCarrier] = useState('');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvv, setCardCvv] = useState('999');

  // Simulator configurations
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('請確認您的扣款資訊項目');

  // Dynamic Voucher check
  const handleApplyCoupon = () => {
    setCouponError('');
    const code = discountCode.trim().toUpperCase();
    if (code === 'DACHUANG_AI') {
      const savings = Math.round(originalPrice * 0.2); // 20% off
      setAppliedDiscount(savings);
      setFinalPrice(originalPrice - savings);
    } else if (code) {
      setCouponError('此優惠代碼無效或已過期');
    }
  };

  const handleStartTransaction = () => {
    if (invoiceType === 'corporate' && !corporateTaxId.trim()) {
      setCouponError('請輸入統編以便核發三聯式發票');
      return;
    }
    setStep(2);
  };

  // Transaction ticker
  useEffect(() => {
    if (step === 2) {
      setProcessingProgress(0);
      const statuses = [
        '達創智能金流閘道：建立 HTTPS 安全信道...',
        '商戶認證檢驗中：DACHUANG_AI_PLATFORM_MERCHANT_ID',
        '向發卡行/行動支付機構要求授權 token...',
        '加密代碼校驗完畢，請求撥款扣帳交易...',
        '扣款成功！正在簽署達創安全數位收據與發票...'
      ];

      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const next = prev + 1;
          const statusIdx = Math.floor((next / 100) * statuses.length);
          if (statuses[statusIdx]) {
            setProcessingStatus(statuses[statusIdx]);
          }
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep(3);
              onSuccess(item.id, type);
            }, 600);
            return 100;
          }
          return next;
        });
      }, 35);

      return () => clearInterval(interval);
    }
  }, [step, item.id, type, onSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(30,144,255,0.25)] flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900 bg-zinc-900/40">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#00d2ff]" />
            <h3 className="text-zinc-200 text-sm font-semibold tracking-wide uppercase font-mono">
              達創智慧網關 API 金流安全結帳
            </h3>
          </div>
          {step !== 2 && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Wizard */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Input Payment Configuration */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-xs"
              >
                {/* Selected Item Recap Table */}
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#00d2ff] tracking-widest">
                        {type === 'course' ? '線上精選課程' : '獨家會員權限'}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-100 mt-0.5 line-clamp-1">
                        {type === 'course' ? (item as Course).title : (item as MembershipPlan).name}
                      </h4>
                      <p className="text-zinc-400 text-[11px] mt-1 line-clamp-1">
                        {type === 'plan' ? (item as MembershipPlan).description : (item as Course).description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-800/80 pt-3 flex flex-col space-y-1.5 font-mono text-[11px] text-zinc-400">
                    <div className="flex justify-between">
                      <span>平台定價 (NTD)</span>
                      <span className="text-zinc-300">NT$ {originalPrice.toLocaleString()}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>優惠碼折抵 (20% OFF)</span>
                        <span>- NT$ {appliedDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-zinc-850 pt-2 text-zinc-100 text-sm font-bold">
                      <span>應付總額</span>
                      <span className="text-[#00d2ff]">NT$ {finalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium tracking-wide">輸入促銷/行銷優惠券代碼</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="例如輸入輸入：DACHUANG_AI (享有八折價)"
                      className="flex-1 bg-zinc-900/80 border border-zinc-850 rounded-xl px-3 py-2 text-zinc-200 placeholder-zinc-650 focus:border-[#00d2ff]/60 focus:outline-none"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 rounded-xl font-medium transition-all text-zinc-300 cursor-pointer"
                    >
                      套用
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-400 text-[11px] flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{couponError}</span>
                    </p>
                  )}
                  {appliedDiscount > 0 && (
                    <p className="text-emerald-400 text-[11px] flex items-center space-x-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>達創 AI 折抵碼套用成功：現折 20%</span>
                    </p>
                  )}
                </div>

                {/* Select Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium tracking-wide">選擇支付手段</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#00d2ff] bg-[#00d2ff]/5 text-white'
                          : 'border-zinc-850 hover:border-zinc-750 text-zinc-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px]">線上信用卡</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('linepay')}
                      className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        paymentMethod === 'linepay'
                          ? 'border-[#00d2ff] bg-[#00d2ff]/5 text-white'
                          : 'border-zinc-850 hover:border-zinc-750 text-zinc-400'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-[8px] font-black flex items-center justify-center text-white select-none">L</span>
                      <span className="text-[10px]">LINE Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`py-2 px-1 border rounded-xl flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        paymentMethod === 'applepay'
                          ? 'border-[#00d2ff] bg-[#00d2ff]/5 text-white'
                          : 'border-zinc-850 hover:border-zinc-750 text-zinc-400'
                      }`}
                    >
                      <span className="w-4 h-4 text-center font-bold text-zinc-300"></span>
                      <span className="text-[10px]">Apple Pay</span>
                    </button>
                  </div>
                </div>

                {/* Payment Detail Fields */}
                <div className="p-3.5 bg-zinc-900/30 rounded-xl border border-zinc-900 space-y-3.5">
                  {paymentMethod === 'card' ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-zinc-500 text-[10px] block mb-1">信用卡卡號 (模擬免除實體扣款)</span>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 focus:border-[#00d2ff]/40 text-zinc-200 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-zinc-500 text-[10px] block mb-1">有效期限</span>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 focus:border-[#00d2ff]/40 text-zinc-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[10px] block mb-1">CVV 安全碼</span>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 focus:border-[#00d2ff]/40 text-zinc-200 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'linepay' ? (
                    <div className="py-2 flex items-center justify-start space-x-3 text-zinc-300 text-[11px]">
                      <span className="px-2 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] rounded">DIRECT LINE_PAY</span>
                      <p>交易確認後將導航拉起 LINE 支付密碼輸入介面並自動回扣。</p>
                    </div>
                  ) : (
                    <div className="py-2 flex items-center justify-start space-x-3 text-zinc-300 text-[11px]">
                      <span className="px-2 py-1 bg-zinc-800 text-zinc-300 font-mono text-[10px] rounded"> APPLE PAY ACTIVE</span>
                      <p>在您的 Mac/iOS 硬體上雙擊側邊鍵即調用觸控或臉部辨識授權。</p>
                    </div>
                  )}
                </div>

                {/* Invoice Type */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium tracking-wide">核發電子發票設定</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={invoiceType === 'individual'}
                        onChange={() => setInvoiceType('individual')}
                        className="text-[#0088ff] focus:ring-0 focus:ring-offset-0 bg-[#0088ff] border-zinc-800"
                      />
                      <span>個人電子發票 (手機載具)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={invoiceType === 'corporate'}
                        onChange={() => setInvoiceType('corporate')}
                        className="text-[#0088ff] focus:ring-0 focus:ring-offset-0 bg-[#0088ff] border-zinc-800"
                      />
                      <span>公司三聯式發票 (含統編)</span>
                    </label>
                  </div>

                  {invoiceType === 'individual' ? (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={personalCarrier}
                        onChange={(e) => setPersonalCarrier(e.target.value)}
                        placeholder="請輸入載具條碼，例：/1A2B3C4 (選填)"
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-1.5 text-zinc-200 placeholder-zinc-650 focus:border-[#00d2ff]/40 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={corporateTaxId}
                        onChange={(e) => {
                          setCorporateTaxId(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="請輸入公司 8 碼統一編號 (必填)"
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-1.5 text-zinc-200 placeholder-zinc-650 focus:border-[#00d2ff]/40 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Safety Seal info */}
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>已啟用 256 位元 SSL 數位存傳防安全校驗 & 全網防範洩漏保障。</span>
                </div>

                {/* Order trigger */}
                <button
                  type="button"
                  onClick={handleStartTransaction}
                  className="w-full py-3 bg-[#0088ff] hover:bg-[#00a6ff] hover:text-white border border-[#0088ff]/20 text-white rounded-xl text-xs font-semibold tracking-wider relative overflow-hidden group cursor-pointer transition-all"
                >
                  <span className="relative z-10">確認付款並啟動安全授權 • NT$ {finalPrice.toLocaleString()}</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Gateway Progress Screen */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="w-16 h-16 rounded-full border-4 border-zinc-900 border-t-[#00d2ff]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-zinc-500 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h4 className="text-zinc-100 text-sm font-semibold tracking-widest font-mono">
                    DACHUANG QUANTUM BANKING
                  </h4>
                  <p className="text-[#00d2ff] font-mono text-[11px] animate-pulse">
                    {processingStatus}
                  </p>
                  <p className="text-zinc-550 text-[10px]">
                    請勿關閉視窗，當前安全通道已通過 TLS v1.3 高級編密。
                  </p>
                </div>

                <div className="w-full max-w-xs bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${processingProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#0055ff] to-[#00d2ff] transition-all duration-100"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Purchase Success Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-2 text-center flex flex-col items-center justify-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-3 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-emerald-400"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <h4 className="text-emerald-400 text-base font-bold tracking-wide">
                    恭喜您！訂單已授權成功
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 block mt-0.5 select-all">
                    金流交易憑證 ID_DA-{Math.floor(Math.random() * 900000) + 100000}-AI
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  感謝您預約「{type === 'course' ? (item as Course).title : (item as MembershipPlan).name}」！發票已核對並核發至個人載具/公司信箱。您現在已獲得該項目的終身無限制回看與線上筆記下載權力。
                </p>

                {/* Ticket Details */}
                <div className="w-full p-4 bg-zinc-900/60 rounded-xl border border-zinc-850 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">交易時間</span>
                    <span className="text-zinc-300 font-mono">2026-06-17 14:06 (台北)</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">付費管道</span>
                    <span className="text-zinc-300 capitalize font-mono">
                      {paymentMethod === 'card' ? 'Visa •••• 9010' : paymentMethod === 'linepay' ? 'LINE Pay Wallet' : ' Apple Wallet'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">實收總計 (NTD)</span>
                    <span className="text-[#00d2ff] font-bold font-mono">NT$ {finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-xs font-semibold text-zinc-200 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-colors cursor-pointer"
                >
                  進入平台並開始研讀
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
