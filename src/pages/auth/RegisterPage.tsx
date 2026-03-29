import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  // Password strength logic
  const getPasswordStrength = () => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) return 'Strong';
    if (password.length >= 6) return 'Medium';
    return 'Weak';
  };

  const strengthColor = {
    Weak: 'bg-red-500',
    Medium: 'bg-yellow-400',
    Strong: 'bg-green-500'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className={`py-3 px-4 border rounded-md flex items-center justify-center ${role === 'entrepreneur' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setRole('entrepreneur')}>
                <Building2 size={18} className="mr-2" /> Entrepreneur
              </button>
              <button type="button" className={`py-3 px-4 border rounded-md flex items-center justify-center ${role === 'investor' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setRole('investor')}>
                <CircleDollarSign size={18} className="mr-2" /> Investor
              </button>
            </div>

            <Input label="Full name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth startAdornment={<User size={18} />} />
            <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth startAdornment={<Mail size={18} />} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />
            
            {/* Password strength meter */}
            <div className="h-2 rounded-md w-full bg-gray-200 mt-1">
              <div className={`${strengthColor[getPasswordStrength() as keyof typeof strengthColor]} h-2 rounded-md`} style={{ width: `${password.length * 10 > 100 ? 100 : password.length * 10}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{getPasswordStrength()} password</p>

            <Input label="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />

            <Button type="submit" fullWidth isLoading={isLoading}>Create account</Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
 export default RegisterPage;