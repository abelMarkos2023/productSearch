import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  POLYMER: String,
  CATEGORY: String,
  BRAND: String,
  GRADE: String,
  MFI: String,
  APPLICATION: String,
}, { timestamps: true });

// const DataModel = mongoose.models.Data || mongoose.model('Data', DataSchema);
// export default DataModel;

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
