import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const LibraryManagementTable = () => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/')
    .then((response) => {
      setResponse(response.data)
    
    })
    .catch((error)=>{
       console.log("Some Thing went wrong");
    })
  }, [])

  const deleteBook = (id) => {
    // Optional: Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
  
    axios.delete(`http://127.0.0.1:8000/api/books/delete/${id}`)
      .then((res) => {
     
        
      
        setResponse(response.filter(book => book.id !== id));
        
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        alert("Failed to delete book. Please try again.");
      });
  }

  return (
     <>
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Library Management System</h1>
        <p className="text-gray-500 mt-1">Manage your book collection</p>
      </div>

     

      {/* Books Table - UI only */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price ($)</th>
                
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Row 1 - You can edit these values */}
              {response && response.map((book) => (
                 
                  <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{book.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Available</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={()=> deleteBook(book.id)} className="text-red-600 hover:text-red-800 font-medium text-sm transition">Delete</button>
                  </td>
                </tr>
))}
              {/* Row 2 */}
             
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats - UI only */}
      <div className="mt-4 text-sm text-gray-500 text-right">
        Total Books: 4
      </div>
    </div>
    </>
  );
};

export default LibraryManagementTable;