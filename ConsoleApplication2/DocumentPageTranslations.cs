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
    
    public partial class DocumentPageTranslations
    {
        public DocumentPageTranslations()
        {
            this.PageFieldTranslations = new HashSet<PageFieldTranslations>();
        }
    
        public System.Guid Id { get; set; }
        public System.Guid DocumentPageId { get; set; }
        public string Language { get; set; }
        public Nullable<System.Guid> DocumentPageImageId { get; set; }
    
        public virtual ObjRoots_DocumentPage ObjRoots_DocumentPage { get; set; }
        public virtual ObjRoots_DocumentPage ObjRoots_DocumentPage1 { get; set; }
        public virtual ObjRoots_PageImage ObjRoots_PageImage { get; set; }
        public virtual ICollection<PageFieldTranslations> PageFieldTranslations { get; set; }
    }
}
