import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FaArrowRight } from "react-icons/fa";

export default function FormStep() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [nim, setNim] = useState("");
  const [error, setError] = useState("");

  const handleStartChat = () => {
    if (!name.trim()) {
      setError("Nama tidak boleh kosong ya!");
      return;
    }
    if (isStudent && !nim.trim()) {
      setError("NRP/NIM wajib diisi jika kamu mahasiswa.");
      return;
    }

    const newUuid = uuidv4();
    localStorage.setItem("user_uuid", newUuid);
    localStorage.setItem("user_name", name);
    localStorage.setItem("is_student", isStudent ? "true" : "false");
    if (isStudent) localStorage.setItem("user_nim", nim);

    router.push("/chat");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl animate-in slide-in-from-bottom-8 fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">First time here?</h2>
      <p className="text-gray-500 mb-8 text-sm">Please enter your name here</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Panggilan</label>
          <input
            type="text"
            placeholder="Masukkan namamu..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <input
            type="checkbox"
            id="isStudent"
            checked={isStudent}
            onChange={(e) => {
              setIsStudent(e.target.checked);
              setError("");
            }}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isStudent" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
            Saya mahasiswa aktif ISTTS
          </label>
        </div>

        {isStudent && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-semibold text-gray-700 mb-1">NRP</label>
            <input
              type="text"
              placeholder="Contoh: 21XXXXXX"
              value={nim}
              onChange={(e) => {
                setNim(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          onClick={handleStartChat}
          className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition-all duration-300 active:scale-95"
        >
          Start Chat <FaArrowRight />
        </button>
      </div>
    </div>
  );
}