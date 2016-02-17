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
    
    public partial class ObjRoots_PageField
    {
        public ObjRoots_PageField()
        {
            this.PageFieldTranslations = new HashSet<PageFieldTranslations>();
        }
    
        public string FieldId { get; set; }
        public string FieldName { get; set; }
        public string Tooltip { get; set; }
        public System.Guid DocumentPageId { get; set; }
        public int FieldType { get; set; }
        public string Html { get; set; }
        public string InitialValue { get; set; }
        public bool IsOutField { get; set; }
        public Nullable<decimal> FontSize { get; set; }
        public Nullable<short> TabIndex { get; set; }
        public bool Required { get; set; }
        public string Pattern { get; set; }
        public Nullable<short> MinimumLength { get; set; }
        public Nullable<short> MaxLength { get; set; }
        public Nullable<int> Min { get; set; }
        public Nullable<int> Max { get; set; }
        public Nullable<short> MinSelected { get; set; }
        public string DataEquals { get; set; }
        public Nullable<bool> UseCurrentDate { get; set; }
        public string RangeDateMin { get; set; }
        public string RangeDateMax { get; set; }
        public Nullable<short> DependencyCount { get; set; }
        public string SelectTitle { get; set; }
        public string SelectFieldSource { get; set; }
        public string SelectPrefixedSource { get; set; }
        public string DependencyData { get; set; }
        public Nullable<bool> IsGroup { get; set; }
        public Nullable<bool> ReadOnly { get; set; }
        public Nullable<bool> RangeDateMinUseCurrent { get; set; }
        public Nullable<bool> RangeDateMaxUseCurrent { get; set; }
        public string Style { get; set; }
        public System.Guid Id { get; set; }
        public string Href { get; set; }
        public Nullable<System.Guid> OutFieldId { get; set; }
        public Nullable<short> CustomValidationCount { get; set; }
        public string CustomValidationData { get; set; }
    
        public virtual ObjRoots ObjRoots { get; set; }
        public virtual ObjRoots_DocumentPage ObjRoots_DocumentPage { get; set; }
        public virtual ObjRoots_DocumentPage ObjRoots_DocumentPage1 { get; set; }
        public virtual ICollection<PageFieldTranslations> PageFieldTranslations { get; set; }
    }
}