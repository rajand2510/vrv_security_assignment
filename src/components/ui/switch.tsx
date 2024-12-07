import * as React from 'react';

const Switch = ({
  initialChecked = false,
  onChange,
}: {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = React.useState(initialChecked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-12 rounded-full transition-colors focus:outline-none ${
          isChecked ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
            isChecked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>

    
    </div>
  );
};

export { Switch };
