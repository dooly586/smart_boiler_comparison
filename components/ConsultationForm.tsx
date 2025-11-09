'use client';

import React, { useState, useRef } from 'react';
import { PaperAirplaneIcon, PhotoIcon, CheckCircleIcon } from './IconComponents';

const ConsultationForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      alert('상담 내용을 입력해주세요.');
      return;
    }
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset form after a while
      setTimeout(() => {
        setMessage('');
        setImage(null);
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg flex items-center">
        <CheckCircleIcon className="w-10 h-10 mr-4"/>
        <div>
            <p className="font-bold text-lg">상담 요청이 성공적으로 접수되었습니다.</p>
            <p>담당자가 확인 후 곧 연락드리겠습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">상담 내용</label>
        <textarea
          id="message"
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="현재 사용 중인 보일러, 설치 환경, 궁금한 점 등을 자세히 적어주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">사진 첨부 (선택)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md" />
            ) : (
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                <span>파일 업로드</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
              </label>
              <p className="pl-1">또는 파일을 끌어오세요</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
      >
        <PaperAirplaneIcon className="w-5 h-5 mr-2" />
        {status === 'submitting' ? '전송 중...' : '상담 요청하기'}
      </button>
    </form>
  );
};

export default ConsultationForm;
