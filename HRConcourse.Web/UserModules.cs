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
    
    public partial class UserModules
    {
        public System.Guid Id { get; set; }
        public System.DateTime ExpirationDate { get; set; }
        public System.Guid UserUserId { get; set; }
        public System.Guid ModuleId { get; set; }
        public System.DateTime DateCreated { get; set; }
    
        public virtual Modules Modules { get; set; }
        public virtual Users Users { get; set; }
    }
}