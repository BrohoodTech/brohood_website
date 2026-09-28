'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, MapPin, Package, Heart, LogOut, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ShippingAddress } from '@/types/ecommerce';

export default function AccountPage() {
  const { user, logout, openAuthModal, updateProfile, addresses, addAddress, updateAddress, deleteAddress } = useStore();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || 'Musharraf Khan',
    phone: user?.phone || '9876543210',
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 text-white space-y-4">
        <User size={36} className="text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold">Sign In to View Your Account</h2>
        <p className="text-xs text-zinc-400">Manage your delivery addresses, track orders, and edit profile details.</p>
        <button
          onClick={() => openAuthModal('access your BroHood account')}
          className="px-6 py-3 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: profileForm.fullName,
      phone: profileForm.phone,
    });
    setIsEditingProfile(false);
  };

  const handleOpenAddAddress = () => {
    setEditingAddressIndex(null);
    setAddressForm({
      fullName: user.fullName || '',
      phone: user.phone || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (index: number) => {
    setEditingAddressIndex(index);
    setAddressForm(addresses[index]);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.phone || !addressForm.addressLine1 || !addressForm.city || !addressForm.pincode) {
      alert('Please fill all required fields');
      return;
    }

    if (editingAddressIndex !== null) {
      updateAddress(editingAddressIndex, addressForm);
    } else {
      addAddress(addressForm);
    }
    setIsAddressModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-black text-xl flex items-center justify-center uppercase shadow-xl">
            {user.fullName ? user.fullName[0] : user.email[0]}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              {user.fullName || 'BroHood Member'}
            </h1>
            <p className="text-xs text-zinc-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider transition-colors w-fit"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <Link
          href="/orders"
          className="p-4 rounded-2xl bg-[#121316] border border-white/5 hover:border-amber-400/40 transition-all flex items-center gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
            <Package size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300">My Orders</h3>
            <p className="text-[10px] text-zinc-400">Track shipments & history</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-4 rounded-2xl bg-[#121316] border border-white/5 hover:border-amber-400/40 transition-all flex items-center gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
            <Heart size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300">Saved Wishlist</h3>
            <p className="text-[10px] text-zinc-400">View favorite pieces</p>
          </div>
        </Link>

        <div className="p-4 rounded-2xl bg-[#121316] border border-white/5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white">Member Tier</h3>
            <p className="text-[10px] text-emerald-400 font-semibold">VIP Free Express Shipping</p>
          </div>
        </div>
      </div>

      {/* Section 1: Profile Information */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={18} className="text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Profile Information</h2>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <Edit2 size={12} />
            <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-md"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-3 rounded-xl bg-[#18191e]">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Full Name</span>
              <span className="text-white font-semibold text-sm">{user.fullName || 'Not provided'}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#18191e]">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Phone (WhatsApp)</span>
              <span className="text-white font-semibold text-sm">{user.phone || '9876543210'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Saved Delivery Addresses */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Saved Shipping Addresses ({addresses.length})
            </h2>
          </div>
          <button
            onClick={handleOpenAddAddress}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-md"
          >
            <Plus size={14} />
            <span>Add Address</span>
          </button>
        </div>

        {addresses.length === 0 ? (
          <p className="text-xs text-zinc-400 py-4">No addresses saved yet. Add your delivery address for faster checkout.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#18191e] border border-white/5 space-y-2 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{addr.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-semibold">
                      {idx === 0 ? 'Default' : `Address #${idx + 1}`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {addr.city}, {addr.state} - <strong className="text-white">{addr.pincode}</strong>
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">Phone: {addr.phone}</p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs">
                  <button
                    onClick={() => handleOpenEditAddress(idx)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteAddress(idx)}
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#121316] border border-white/10 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-base font-bold uppercase tracking-wider">
              {editingAddressIndex !== null ? 'Edit Shipping Address' : 'Add New Shipping Address'}
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  required
                  placeholder="House number, flat, street"
                  value={addressForm.addressLine1}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                  className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
