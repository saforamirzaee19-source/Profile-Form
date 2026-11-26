import { useState, useEffect, useRef } from "react";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  profession: "",
};

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("Profile");
    return saved ? JSON.parse(saved) : emptyForm;
  });

  const firstInput = useRef(null);

  const hasData = Object.values(formData).some((value) => value !== "");

  useEffect(() => {
    if (hasData) {
      localStorage.setItem("Profile", JSON.stringify(formData));
    } else {
      localStorage.removeItem("Profile");
    }
  }, [formData, hasData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>

            <input
              ref={firstInput}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 font-medium">Country</label>

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Profession */}
          <div>
            <label className="block mb-1 font-medium">Profession</label>

            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>
        </form>

        {/* Profile */}
        {!hasData ? (
          <p className="text-center text-gray-500 mt-6">
            No profile information found. Please fill out the form.
          </p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            <p className="mb-2">
              <strong>Full Name:</strong> {formData.fullName}
            </p>

            <p className="mb-2">
              <strong>Email:</strong> {formData.email}
            </p>

            <p className="mb-2">
              <strong>Phone Number:</strong> {formData.phone}
            </p>

            <p className="mb-2">
              <strong>Country:</strong> {formData.country}
            </p>

            <p className="mb-2">
              <strong>Profession:</strong> {formData.profession}
            </p>

            {/* Buttons */}
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
