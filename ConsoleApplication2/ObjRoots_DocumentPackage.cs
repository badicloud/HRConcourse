//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ConsoleApplication2
{
    using System;
    using System.Collections.Generic;
    
    public partial class ObjRoots_DocumentPackage
    {
        public ObjRoots_DocumentPackage()
        {
            this.ObjRoots_Document = new HashSet<ObjRoots_Document>();
        }
    
        public string Name { get; set; }
        public bool IsRequired { get; set; }
        public System.Guid Id { get; set; }
        public bool IsKiosk { get; set; }
    
        public virtual ObjRoots ObjRoots { get; set; }
        public virtual ICollection<ObjRoots_Document> ObjRoots_Document { get; set; }
    }
}
