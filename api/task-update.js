// DEPRECATED
export default function handler(req,res){res.status(410).json({ok:false,error:{code:"DEPRECATED_API",message:"Use /api/tasks/{id}",status:410}})}