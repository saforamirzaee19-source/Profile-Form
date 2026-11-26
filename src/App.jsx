import { useState, useEffect, useRef } from "react";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  profession: "",
};

const fields = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "country", label: "Country", type: "text" },
  { name: "profession", label: "Profession", type: "text" },
];

function App() {
  // Load saved data when the app starts
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("Profile");
    return saved ? JSON.parse(saved) : emptyForm;
  });

  const firstInput = useRef(null);
  const hasData = Object.values(formData).some((value) => value !== "");

  // Auto save on every change
  useEffect(() => {
    if (hasData) {
      localStorage.setItem("Profile", JSON.stringify(formData));
    } else {
      localStorage.removeItem("Profile");
    }
  }, [formData, hasData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update: move the cursor to the form for editing
  const updateProfile = () => {
    firstInput.current.focus();
  };

  const clearProfile = () => {
    localStorage.removeItem("Profile");
    setFormData(emptyForm);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Profile Form</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          {fields.map((field, index) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block mb-1 font-medium">
                {field.label}
              </label>
              <input
                ref={index === 0 ? firstInput : null}
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3"
              />
            </div>
          ))}
        </form>

        {!hasData ? (
          <p className="text-center text-gray-500 mt-6">
            No profile information found. Please fill out the form.
          </p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            {fields.map((field) => (
              <p key={field.name} className="mb-2">
                <strong>{field.label}:</strong> {formData[field.name]}
              </p>
            ))}

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={updateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={clearProfile}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Clear Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
