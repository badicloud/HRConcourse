﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Abp.Domain.Repositories;
using Abp.Web.Mvc.Authorization;
using HRConcourse.Documents;
using HRConcourse.PdfRendering;

namespace HRConcourse.Web.Controllers
{
    [AbpMvcAuthorize]
    public class UploadPdfToImageController : HRConcourseControllerBase
    {
        private readonly PdfToImageService _pdfToImageService;
        private readonly IRepository<Image> _imageRepository;

        public UploadPdfToImageController(PdfToImageService pdfToImageService, IRepository<Image> imageRepository)
        {
            _pdfToImageService = pdfToImageService;
            _imageRepository = imageRepository;
        }

        [HttpPost]
        public ActionResult Index()
        {
            var objectList = new List<object>();

            var file = HttpContext.Request.Files[0];

            using (var reader = new BinaryReader(file.InputStream))
            {
                file.InputStream.Seek(0, SeekOrigin.Begin);
                var fileData = reader.ReadBytes(file.ContentLength);

                var generatedImages = _pdfToImageService.ConvertPdfToImages(fileData);

                foreach (var image in generatedImages)
                {
                    objectList.Add(new
                    {
                        index = image.Key,
                        imageId = _imageRepository.InsertAndGetId(image.Value)
                    });
                }

                return Json(objectList);
            }
        }
    }
}