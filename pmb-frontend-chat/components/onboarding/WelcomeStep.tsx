import { FaRobot } from "react-icons/fa";
import Image from "next/image";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="bg-indigo-100 p-6 rounded-full">
        {/* <FaRobot className="text-6xl text-indigo-600" /> */}
        <Image src="/istts_logo.png" width={150} height={150} alt="logo ISTTS"/>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Selamat datang di Agent PMB Institut STTS berbasis AI!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Asisten pintar yang siap membantu menjawab semua pertanyaanmu terkait pendaftaran, jurusan, biaya studi mahasiswa, beasiswa untuk mahasiswa baru dan fasilitas di Institut STTS.
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Mulai Sekarang
      </button>
    </div>
  );
}