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
    
    public partial class ObjRoots_ComboGroup
    {
        public ObjRoots_ComboGroup()
        {
            this.ObjRoots_ComboValue = new HashSet<ObjRoots_ComboValue>();
        }
    
        public string Name { get; set; }
        public System.Guid Id { get; set; }
    
        public virtual ObjRoots ObjRoots { get; set; }
        public virtual ICollection<ObjRoots_ComboValue> ObjRoots_ComboValue { get; set; }
    }
}
