
import { 
  Plus,ArrowLeftRight,Users
} from 'lucide-react';

const AddAsset = ({setCurrentPage})=> {
  return (
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300" onClick={()=>setCurrentPage('newPurchase')}>
          <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">New Purchase</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-orange-300" onClick={()=>setCurrentPage('addTransfer')}>
          <ArrowLeftRight className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Transfer Asset</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-green-300" onClick={()=>setCurrentPage('addAssignment')}>
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Assign Asset</p>
        </button>
      </div>
  )
}

export default AddAsset