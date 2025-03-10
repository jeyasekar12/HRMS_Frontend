import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const Textarea = React.forwardRef(({ type, placeholder, label, register, name, errors, className, value, onchange }, ref) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='flex justify-between items-center text-slate-800 text-start'>
          <span>
            {label}
            <span className='text-red-600'>*</span>
          </span>
          {name === 'log_password' && (
            <a href='/forgot-password' className='text-sm text-red-500 hover:underline'>
              Forgot Password?
            </a>
          )}
        </label>
      )}

      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...register}
          value={value}
          onChange={onchange}
          aria-invalid={errors ? 'true' : 'false'}
          className={clsx(
            'bg-transparent px-3 pt-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 outline-none text-base focus:right-2 ring-blue-300',
            className
          )}
        />
      </div>

      {errors && <span className='text-sm text-red-500 mt-0.5 text-start'>{errors}</span>}
    </div>
  );
});

// Add display name for better debugging
Textarea.displayName = 'Textarea';

// Define prop types for validation
Textarea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.object,
  name: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onchange: PropTypes.func,
};

export default Textarea;
