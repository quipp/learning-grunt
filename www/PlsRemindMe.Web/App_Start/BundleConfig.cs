using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;

namespace PlsRemindMe.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            //

            bundles.Add(new ScriptBundle("~/javascript/plsremind.me.bundle.libraries").Include(
                "~/Scripts/jquery-{version}.js",
                //"~/Scripts/jquery-ui-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootstrap-datepicker.js",
                "~/Scripts/bootstrap-paginator.js",
                "~/Scripts/bootstrap-timepicker.js",
                "~/Scripts/TrafficCop.js",
                "~/Scripts/infuser.js",
                "~/Scripts/knockout-2.3.0.js",
                "~/Scripts/knockout.mapping-latest.js",
                "~/Scripts/knockout.validation.debug.js",
                "~/Scripts/koExternalTemplateEngine_all.js",
                "~/Scripts/knockout-postbox.js",
                "~/Scripts/underscore.js",
                "~/Scripts/moment.js"
                ));

            bundles.Add(new Bundle("~/css/plsremind.me.bundle.libraries").Include(
                "~/content/less/bootstrap.less",
                "~/content/bootstrap-datepicker.css",
                "~/content/bootstrap-timepicker.css",
                "~/content/less/responsive.less",
                "~/content/bootswatch.less",
                "~/content/plsremind.me.bootstrapoverride.less"
                ));

            bundles.Add(new Bundle("~/css/plsremind.me.bundle").Include(
                "~/content/plsremind.me.core.less"
                ));

            var typescriptBundle = new ScriptBundle("~/javascript/plsremind.me.bundle");
            typescriptBundle.IncludeDirectory("~/js/_output", "*.js", true);

            //typescriptBundle.IncludeDirectory("~/js", "*.js", true);
            //typescriptBundle.IncludeDirectory("~/js/Binders", "*.js", true);
            //typescriptBundle.IncludeDirectory("~/js/Models", "*.js", true);
            //typescriptBundle.IncludeDirectory("~/js/ViewModels", "*.js", true);
            //typescriptBundle.Transforms.Add(new JsTransformer());
            //typescriptBundle.Orderer = new AlphaSortedBundleOrderer();
            bundles.Add(typescriptBundle);
            
            BundleTable.EnableOptimizations = false;
        }
    }

    public class AlphaSortedBundleOrderer : IBundleOrderer
    {
        public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
        {
            var sortedFiles = files.OrderBy(x => x.Name).ToList();

            return sortedFiles;
        }

        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            var sortedFiles = files.OrderBy(x => x.VirtualFile.Name).ToList();

            return sortedFiles;
        }
    }
}