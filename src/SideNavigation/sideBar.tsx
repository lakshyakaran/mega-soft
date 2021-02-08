/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ==============================================================
// Auto select left navbar
// ==============================================================
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";



export const initSideBar = function () {
  

  ("use strict");
  var url = window.location + "";
  var path = url.replace(
    window.location.protocol + "//" + window.location.host + "/",
    ""
  );
  var element = $("ul#sidebarnav a").filter(function () {
    // return this.href === url || this.href === path; // || url.href.indexOf(this.href) === 0;
    return true;
  });
  element.parentsUntil(".sidebar-nav").each(function (index) {
    if ($(this).is("li") && $(this).children("a").length !== 0) {
      $(this).children("a").addClass("active");
      $(this).parent("ul#sidebarnav").length === 0
        ? $(this).addClass("active")
        : $(this).addClass("selected");
    } else if (!$(this).is("ul") && $(this).children("a").length === 0) {
      $(this).addClass("selected");
    } else if ($(this).is("ul")) {
      $(this).addClass("in");
    }
  });

  element.addClass("active");
  $("#sidebarnav a").on("click", function (e) {
    // console.log("side nav clicked==>");

    if (!$(this).hasClass("active")) {
      // hide any open menus and remove all other classes
      $("ul", $(this).parents("ul:first")).removeClass("in");
      $("a", $(this).parents("ul:first")).removeClass("active");

      // open our new menu and add the open class
      $(this).next("ul").addClass("in");
      $(this).addClass("active");
    } else if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).parents("ul:first").removeClass("active");
      $(this).next("ul").removeClass("in");
    }
  });
  $("#sidebarnav >li >a.has-arrow").on("click", function (e) {
    e.preventDefault();
  });

  // JQuery function
  $(".nav_employee").show();
  $(".nav_manager").hide();
  $(".nav_hr_contact").hide();

  $("#nav_employee").click(function (x) {
    $(".nav_employee").show();
    $(".nav_manager").hide();
    $(".nav_hr_contact").hide();

    sessionStorage.setItem('roleType', "Employee")
    
    // $("#nav_employee").addClass("active");
    // $("#nav_manager").removeClass("active");
    // $("#nav_hr").removeClass("active");
  });


  $("#nav_manager").click(function () {
    $(".nav_employee").hide();
    $(".nav_manager").show();
    $(".nav_hr_contact").hide();
    // $("#nav_manager").addClass("active");
    // $("#nav_employee").removeClass("active");
    // $("#nav_hr").removeClass("active");

    sessionStorage.setItem('roleType', "Manager")

  });

  $("#nav_hr_contact").click(function () {
    $(".nav_employee").hide();
    $(".nav_manager").hide();
    $(".nav_hr_contact").show();
    // $("#nav_hr").addClass("active");
    // $("#nav_employee").removeClass("active");
    // $("#nav_manager").removeClass("active");

    sessionStorage.setItem('roleType', "HR Contact")

  });
};
