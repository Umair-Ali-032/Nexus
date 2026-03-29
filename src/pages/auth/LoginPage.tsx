import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // For 2FA mock
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, role);

      if (!showOtp) {
        // Show OTP input for 2FA mock
        setShowOtp(true);
        setIsLoading(false);
        return;
      }

      // OTP verification (mock: any 6-digit number)
      if (otp.length === 6) {
        navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Business Nexus
        </h2>
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
              <button
                type="button"
                className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                  role === 'entrepreneur'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('entrepreneur')}
              >
                <Building2 size={18} className="mr-2" />
                Entrepreneur
              </button>

              <button
                type="button"
                className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                  role === 'investor'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('investor')}
              >
                <CircleDollarSign size={18} className="mr-2" />
                Investor
              </button>
            </div>

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<User size={18} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            {showOtp && (
              <Input
                label="Enter OTP (123456)"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                fullWidth
                startAdornment={<ShieldCheck size={18} />}
              />
            )}

            <Button type="submit" fullWidth isLoading={isLoading} leftIcon={<LogIn size={18} />}>
              {showOtp ? 'Verify OTP' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => fillDemoCredentials('entrepreneur')}>
              Entrepreneur Demo
            </Button>
            <Button variant="outline" onClick={() => fillDemoCredentials('investor')}>
              Investor Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;