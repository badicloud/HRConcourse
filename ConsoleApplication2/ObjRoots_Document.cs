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
    
    public partial class ObjRoots_Document
    {
        public ObjRoots_Document()
        {
            this.ObjRoots_Document1 = new HashSet<ObjRoots_Document>();
            this.ObjRoots_DocumentPage = new HashSet<ObjRoots_DocumentPage>();
            this.ObjRoots_DocumentPage1 = new HashSet<ObjRoots_DocumentPage>();
            this.ObjRoots_Document11 = new HashSet<ObjRoots_Document>();
            this.ObjRoots_DocumentInstance = new HashSet<ObjRoots_DocumentInstance>();
            this.ObjRoots_Document12 = new HashSet<ObjRoots_Document>();
            this.ObjRoots_DocumentPackage = new HashSet<ObjRoots_DocumentPackage>();
        }
    
        public string Name { get; set; }
        public bool RequiresHardSignature { get; set; }
        public int DaysToExpire { get; set; }
        public string OriginalLanguage { get; set; }
        public Nullable<System.Guid> DocumentTypeId { get; set; }
        public Nullable<System.Guid> OverriddenByDocumentId { get; set; }
        public Nullable<System.Guid> ParentDocumentId { get; set; }
        public Nullable<System.Guid> ChildTypeMergeFieldId { get; set; }
        public string ChildTypeMergeFieldValue { get; set; }
        public System.Guid Id { get; set; }
        public bool IsReadOnly { get; set; }
        public int Revision { get; set; }
        public Nullable<System.DateTime> DocumentExpirationDate { get; set; }
        public Nullable<bool> InstantiateParent { get; set; }
        public bool IsReadyForInstantiation { get; set; }
        public bool AutoExpire { get; set; }
        public int Order { get; set; }
        public Nullable<System.Guid> TranslationOfDocumentId { get; set; }
    
        public virtual ObjRoots ObjRoots { get; set; }
        public virtual ICollection<ObjRoots_Document> ObjRoots_Document1 { get; set; }
        public virtual ObjRoots_Document ObjRoots_Document2 { get; set; }
        public virtual ObjRoots_MergeField ObjRoots_MergeField { get; set; }
        public virtual ICollection<ObjRoots_DocumentPage> ObjRoots_DocumentPage { get; set; }
        public virtual ICollection<ObjRoots_DocumentPage> ObjRoots_DocumentPage1 { get; set; }
        public virtual ICollection<ObjRoots_Document> ObjRoots_Document11 { get; set; }
        public virtual ObjRoots_Document ObjRoots_Document3 { get; set; }
        public virtual ObjRoots_DocumentType ObjRoots_DocumentType { get; set; }
        public virtual ICollection<ObjRoots_DocumentInstance> ObjRoots_DocumentInstance { get; set; }
        public virtual ICollection<ObjRoots_Document> ObjRoots_Document12 { get; set; }
        public virtual ObjRoots_Document ObjRoots_Document4 { get; set; }
        public virtual ICollection<ObjRoots_DocumentPackage> ObjRoots_DocumentPackage { get; set; }
    }
}