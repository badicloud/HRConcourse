//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRConcourse.Web
{
    using System;
    using System.Collections.Generic;
    
    public partial class HierTypes
    {
        public HierTypes()
        {
            this.Hiers = new HashSet<Hiers>();
        }
    
        public System.Guid HierTypeId { get; set; }
        public Nullable<System.Guid> ParentHierTypeId { get; set; }
        public string HierTypeName { get; set; }
        public Nullable<System.Guid> RoleIdRequiredForUpdates { get; set; }
    
        public virtual ICollection<Hiers> Hiers { get; set; }
    }
}