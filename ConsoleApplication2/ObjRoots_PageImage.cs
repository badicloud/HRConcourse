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
    
    public partial class ObjRoots_PageImage
    {
        public ObjRoots_PageImage()
        {
            this.DocumentPageTranslations = new HashSet<DocumentPageTranslations>();
            this.ObjRoots_DocumentPage = new HashSet<ObjRoots_DocumentPage>();
        }
    
        public byte[] Image { get; set; }
        public System.Guid Id { get; set; }
    
        public virtual ICollection<DocumentPageTranslations> DocumentPageTranslations { get; set; }
        public virtual ObjRoots ObjRoots { get; set; }
        public virtual ICollection<ObjRoots_DocumentPage> ObjRoots_DocumentPage { get; set; }
    }
}
