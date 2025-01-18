<?php
    $tz = new DateTimeZone(get_option('timezone_string'));
    $tomeww = new DateTime("now+1day", $tz);
    $tomew = $tomeww->format('Y/m/d');
    $ysetr = new DateTime("now-1day", $tz);
    $yset = $ysetr->format('Y/m/d');
    $today = new DateTime("now", $tz);
    $myToday = $today->format('Y/m/d');
?>
<style>
    .bouttonsG .tablinks.active {
        background: <?php echo get_option('color_button') ?>;
        color: #ffffff !important;
    }

    .bouttonsG .tablinks {
        background: <?php echo get_option('Other_buttons_color') ?>;
        color: #ffffff;
    }
</style>
<div class="blocettks">
    <div class="Elgadwl-sc">
        <div class="boxTitleG">
            <div class="titleG"><?php _e('Match Schedule', LIVEPRESS_TEXTDOMAIN); ?></div>
            <div class="bouttonsG tab">
                <a class="tablinks" href="javascript:void(0)" id="yas" onclick="openTabs(event, 'yesterday')">
                    <?php _e('Yesterday Matches', LIVEPRESS_TEXTDOMAIN); ?>
                </a>
                <a class="tablinks active" href="javascript:void(0)" id="tod" onclick="openTabs(event, 'Today')">
                    <?php _e('Today Matches', LIVEPRESS_TEXTDOMAIN); ?>
                </a>
                <a class="tablinks" href="javascript:void(0)" id="tom" onclick="openTabs(event, 'Tomorrow')">
                    <?php _e('Tomorrow Matches', LIVEPRESS_TEXTDOMAIN); ?>
                </a>
            </div>
        </div>
        <div class="contents widget-content" id="content">
            <div class='boxGadwlTare5'>
                <div class='r'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                    <span id="date-display">
                        <?php
                            // إنشاء كائن IntlDateFormatter
                            $fmt = new IntlDateFormatter('ar_EG', IntlDateFormatter::NONE, IntlDateFormatter::SHORT);
                            // تعيين التنسيق ليشمل اليوم في الأسبوع
                            $fmt->setPattern('EEEE، yyyy/MM/dd');        
                            // عرض التاريخ بتنسيق "يوم الأربعاء 13/11/2024"
                            echo $fmt->format(strtotime($myToday)); // سيتم عرض التاريخ المطلوب

                        ?>
                    </span>
                </div>
                <div class='l'>
                    بتوقيت بلدك <?php dark_mode_toggle_button(); ?>
                </div>
            </div>
            <!-- Loader Section -->
            <div id="loader">
                <img class="loader-img" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3Lnm7ZC4kxdKUQFuPslkYTmh2hXbKmWbADjqXQY1w3-DwxBkWUgFRI2SZ5cyUys36z6AJK5-E7FLjLs1jRbHMaLGObnlFgaxFJ6nvxDuFxbUOsULOnF9T2kqSowDT3XhBvgDOR6IM0G0n6mE_B95QjZ2PncsZaaXLPeD-azx89q93Ig1tuRD4UFpG-Irz/s1600/wait.gif" alt="matchs" width="50" height="50" />
            </div>
            <div id="yesterday" class="tabcontent">
                <?php
                // تعديل استعلام WP_Query لجلب المباريات حسب تاريخ اليوم
                $args = array(
                    'post_type' => array('match'),
                    'posts_per_page' => -1,
                    'meta_key' => 'time_start', // استخدم مفتاح الوقت لترتيب النتائج
                    'order' => 'ASC', // ترتيب تصاعدي
                    'meta_query' => array(
                        array(
                            'key' => 'time_start',
                            'value' => $yset,
                            'compare' => 'LIKE', // استخدام LIKE للبحث عن أي تاريخ يحتوي على اليوم
                        ),
                    ),
                );
                $matches = new WP_Query($args);
                if ($matches->have_posts()) {
                    while ($matches->have_posts()) {
                        $matches->the_post();
                        // جلب بيانات المباراة
                        $fareq1_logo_id = get_post_meta(get_the_ID(), 'fareq1_logo', true);
                        $fareq2_logo_id = get_post_meta(get_the_ID(), 'fareq2_logo', true);
                        $fareq1_logo_url = wp_get_attachment_url($fareq1_logo_id);
                        $fareq2_logo_url = wp_get_attachment_url($fareq2_logo_id);
                        $fareq1_name = get_post_meta(get_the_ID(), 'fareq1_name', true);
                        $fareq2_name = get_post_meta(get_the_ID(), 'fareq2_name', true);
                        $score_team1 = get_post_meta(get_the_ID(), 'score_team1', true);
                        $score_team2 = get_post_meta(get_the_ID(), 'score_team2', true);
                        $time_start = get_post_meta(get_the_ID(), 'time_start', true);
                        $time_end = get_post_meta(get_the_ID(), 'time_end', true);
                        $btola = get_post_meta(get_the_ID(), 'btola', true);
                        $channel = get_post_meta(get_the_ID(), 'channel', true);
                        $caller = get_post_meta(get_the_ID(), 'caller', true);
                ?>
                <div class="m_block egy_sports_item" rel="<?php echo $time_start; ?>">
                    <a class="ElGadwl" href="<?php the_permalink() ?>" title="">
                        <div class="Gadwl-Top">
                            <div class="Fareeq-r">
                                <img alt="<?php echo $fareq1_name; ?>" src="<?php echo $fareq1_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq1_name; ?></span>
                            </div>
                            <div class="Fareeq-c">
                                <span class="bouton">
                                    <p id="msmsma" style="font-size: 13px;"><?php _e('Loading', LIVEPRESS_TEXTDOMAIN); ?></p>
                                </span>
                                <div>
                                    <div class="fc_time">
                                        <span id="hdaf1"><?php echo $score_team1; ?></span> - <span id="hdaf2"><?php echo $score_team2; ?></span>
                                    </div>
                                    <div class="date stay" data-start="<?php echo $time_start; ?>" data-gameends="<?php echo $time_end; ?>" id="<?php echo get_the_ID() ?>"></div>
                                    <div class="timer-status">
                                        <span class="timer"></span>
                                        <span class="status"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="Fareeq-l">
                                <img alt="<?php echo $fareq2_name; ?>" src="<?php echo $fareq2_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq2_name; ?></span>
                            </div>
                        </div>
                        <?php if ( get_option( 'display_info_Gadwl_Bot' ) == '1' ) { ?>
                        <div class="Gadwl-Bot">
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512" class="svg-inline--fa fa-trophy fa-w-18">
                                    <path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" class=""></path>
                                </svg>
                                <?php if ( $btola != null ){echo $btola;}else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN);} ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tv-retro" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" class="svg-inline--fa fa-tv-retro fa-w-16">
                                    <path fill="currentColor" d="M464 96H338.8l35.7-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 94.2 182.8 9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L173.2 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h16v32h48l21.3-32h245.3l21.3 32h48v-32h16c26.5 0 48-21.5 48-48V144c.1-26.5-21.4-48-47.9-48zm-72 312s0 8-168 8c-152 0-152-8-152-8s-8 0-8-120 8-120 8-120 0-8 152-8c168 0 168 8 168 8s8 0 8 120-8 120-8 120zm72-100c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8z" class=""></path>
                                </svg>
                                <?php if ( $channel != null ){echo $channel;} else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11">
                                    <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path>
                                </svg>
                                <?php if ( $caller != null ){ echo $caller; } else { echo __('Not specified yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                        </div>
                        <?php } ?>
                    </a>
                </div>
                <!--                // End of m_block-->
                <?php  }
                } else { ?>
                <div class="latwgdmobaryat">
                    <span id="rsrsr"></span>
                    <div><?php _e('No matches today', LIVEPRESS_TEXTDOMAIN); ?></div>
                    <span id="lslsl"></span>
                </div>
                <?php } wp_reset_postdata();?>
            </div>
            <div id="Today" class="tabcontent active">
                <?php
                    // تعديل استعلام WP_Query لجلب المباريات حسب تاريخ اليوم
                $time_start = get_post_meta(get_the_ID(), 'time_start', true);    
                $args = array(
                    'post_type' => array('match'),
                    'posts_per_page' => -1,
                    'meta_key' => 'time_start', // استخدم مفتاح الوقت لترتيب النتائج
                    'order' => 'ASC', // ترتيب تصاعدي
                    'meta_query' => array(
                        array(
                        'key' => 'time_start',
                        'value' => $myToday,
                        'compare' => 'LIKE', // استخدام LIKE للبحث عن أي تاريخ يحتوي على اليوم
                        ),
                    ),
                );
                $matches = new WP_Query($args);
                if ($matches->have_posts()) {
                    while ($matches->have_posts()) {
                    $matches->the_post();
                    // جلب معرفات الصور
                    $fareq1_logo_id = get_post_meta(get_the_ID(), 'fareq1_logo', true);
                    $fareq2_logo_id = get_post_meta(get_the_ID(), 'fareq2_logo', true);
                    $fareq1_logo_url = wp_get_attachment_url($fareq1_logo_id);
                    $fareq2_logo_url = wp_get_attachment_url($fareq2_logo_id);
                    $fareq1_name = get_post_meta(get_the_ID(), 'fareq1_name', true);
                    $fareq2_name = get_post_meta(get_the_ID(), 'fareq2_name', true);
                    $score_team1 = get_post_meta(get_the_ID(), 'score_team1', true);
                    $score_team2 = get_post_meta(get_the_ID(), 'score_team2', true);
                    $time_start = get_post_meta(get_the_ID(), 'time_start', true);
                    $time_end = get_post_meta(get_the_ID(), 'time_end', true);
                    $btola = get_post_meta(get_the_ID(), 'btola', true);
                    $channel = get_post_meta(get_the_ID(), 'channel', true);
                    $caller = get_post_meta(get_the_ID(), 'caller', true);
                ?>
                <div class="m_block egy_sports_item" rel="<?php echo $time_start; ?>">
                    <a class="ElGadwl" href="<?php the_permalink() ?>" title="">
                        <div class="Gadwl-Top">
                            <div class="Fareeq-r">
                                <img alt="<?php echo $fareq1_name; ?>" src="<?php echo $fareq1_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq1_name; ?></span>
                            </div>
                            <div class="Fareeq-c">
                                <span class="bouton">
                                    <p id="msmsma" style="font-size: 13px;"><?php _e('Loading', LIVEPRESS_TEXTDOMAIN); ?></p>
                                </span>
                                <div>
                                    <div class="fc_time">
                                        <span id="hdaf1"><?php echo $score_team1; ?></span> - <span id="hdaf2"><?php echo $score_team2; ?></span>
                                    </div>
                                    <div class="date stay" data-start="<?php echo $time_start; ?>" data-gameends="<?php echo $time_end; ?>" id="<?php echo get_the_ID() ?>"></div>
                                    <div class="timer-status">
                                        <span class="timer"></span>
                                        <span class="status"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="Fareeq-l">
                                <img alt="<?php echo $fareq2_name; ?>" src="<?php echo $fareq2_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq2_name; ?></span>
                            </div>
                        </div>
                        <?php if ( get_option( 'display_info_Gadwl_Bot' ) == '1' ) { ?>
                        <div class="Gadwl-Bot">
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512" class="svg-inline--fa fa-trophy fa-w-18">
                                    <path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" class=""></path>
                                </svg>
                                <?php if ( $btola != null ){echo $btola;}else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN);} ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tv-retro" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" class="svg-inline--fa fa-tv-retro fa-w-16">
                                    <path fill="currentColor" d="M464 96H338.8l35.7-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 94.2 182.8 9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L173.2 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h16v32h48l21.3-32h245.3l21.3 32h48v-32h16c26.5 0 48-21.5 48-48V144c.1-26.5-21.4-48-47.9-48zm-72 312s0 8-168 8c-152 0-152-8-152-8s-8 0-8-120 8-120 8-120 0-8 152-8c168 0 168 8 168 8s8 0 8 120-8 120-8 120zm72-100c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8z" class=""></path>
                                </svg>
                                <?php if ( $channel != null ){echo $channel;} else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11">
                                    <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path>
                                </svg>
                                <?php if ( $caller != null ){ echo $caller; } else { echo __('Not specified yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                        </div>
                        <?php } ?>
                    </a>
                </div>
                <!--                // End of m_block-->
                <?php }
                } else { ?>
                <div class="latwgdmobaryat">
                    <span id="rsrsr"></span>
                    <div><?php _e('No matches today', LIVEPRESS_TEXTDOMAIN); ?></div>
                    <span id="lslsl"></span>
                </div>
                <?php } wp_reset_postdata();?>
            </div>
            <div id="Tomorrow" class="tabcontent">
                <?php
                // تعديل استعلام WP_Query لجلب المباريات حسب تاريخ اليوم
                $args = array(
                    'post_type' => array('match'),
                    'posts_per_page' => -1,
                    'meta_key' => 'time_start', // استخدم مفتاح الوقت لترتيب النتائج
                    'order' => 'ASC', // ترتيب تصاعدي
                    'meta_query' => array(
                        array(
                            'key' => 'time_start',
                            'value' => $tomew,
                            'compare' => 'LIKE', // استخدام LIKE للبحث عن أي تاريخ يحتوي على اليوم
                        ),
                    ),
                );
                $matches = new WP_Query($args);
                if ($matches->have_posts()) {
                    while ($matches->have_posts()) {
                        $matches->the_post();
                        // جلب معرفات الصور
                        $fareq1_logo_id = get_post_meta(get_the_ID(), 'fareq1_logo', true);
                        $fareq2_logo_id = get_post_meta(get_the_ID(), 'fareq2_logo', true);
                        $fareq1_logo_url = wp_get_attachment_url($fareq1_logo_id);
                        $fareq2_logo_url = wp_get_attachment_url($fareq2_logo_id);
                        $fareq1_name = get_post_meta(get_the_ID(), 'fareq1_name', true);
                        $fareq2_name = get_post_meta(get_the_ID(), 'fareq2_name', true);
                        $score_team1 = get_post_meta(get_the_ID(), 'score_team1', true);
                        $score_team2 = get_post_meta(get_the_ID(), 'score_team2', true);
                        $time_start = get_post_meta(get_the_ID(), 'time_start', true);
                        $time_end = get_post_meta(get_the_ID(), 'time_end', true); 
                        $btola = get_post_meta(get_the_ID(), 'btola', true);
                        $channel = get_post_meta(get_the_ID(), 'channel', true);
                        $caller = get_post_meta(get_the_ID(), 'caller', true);
                ?>
                <div class="m_block egy_sports_item" rel="<?php echo $time_start; ?>">
                    <a class="ElGadwl" href="<?php the_permalink() ?>" title="">
                        <div class="Gadwl-Top">
                            <div class="Fareeq-r">
                                <img alt="<?php echo $fareq1_name; ?>" src="<?php echo $fareq1_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq1_name; ?></span>
                            </div>
                            <div class="Fareeq-c">
                                <span class="bouton">
                                    <p id="msmsma" style="font-size: 13px;"><?php _e('Loading', LIVEPRESS_TEXTDOMAIN); ?></p>
                                </span>
                                <div>
                                    <div class="fc_time">
                                        <span id="hdaf1"><?php echo $score_team1; ?></span> - <span id="hdaf2"><?php echo $score_team2; ?></span>
                                    </div>
                                    <div class="date stay" data-start="<?php echo $time_start; ?>" data-gameends="<?php echo $time_end; ?>" id="<?php echo get_the_ID() ?>"></div>
                                    <div class="timer-status">
                                        <span class="timer"></span>
                                        <span class="status"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="Fareeq-l">
                                <img alt="<?php echo $fareq2_name; ?>" src="<?php echo $fareq2_logo_url; ?>" />
                                <span class="team-name"><?php echo $fareq2_name; ?></span>
                            </div>
                        </div>
                        <?php if ( get_option( 'display_info_Gadwl_Bot' ) == '1' ) { ?>
                        <div class="Gadwl-Bot">
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512" class="svg-inline--fa fa-trophy fa-w-18">
                                    <path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" class=""></path>
                                </svg>
                                <?php if ( $btola != null ){echo $btola;}else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN);} ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tv-retro" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" class="svg-inline--fa fa-tv-retro fa-w-16">
                                    <path fill="currentColor" d="M464 96H338.8l35.7-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 94.2 182.8 9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L173.2 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h16v32h48l21.3-32h245.3l21.3 32h48v-32h16c26.5 0 48-21.5 48-48V144c.1-26.5-21.4-48-47.9-48zm-72 312s0 8-168 8c-152 0-152-8-152-8s-8 0-8-120 8-120 8-120 0-8 152-8c168 0 168 8 168 8s8 0 8 120-8 120-8 120zm72-100c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v8z" class=""></path>
                                </svg>
                                <?php if ( $channel != null ){echo $channel;} else {echo __('Not set yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                            <div class="cols">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11">
                                    <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path>
                                </svg>
                                <?php if ( $caller != null ){ echo $caller; } else { echo __('Not specified yet', LIVEPRESS_TEXTDOMAIN); } ?>
                            </div>
                        </div>
                        <?php } ?>
                    </a>
                </div>
                <!--  // End of m_block-->
                <?php  } } else { ?>
                <div class="latwgdmobaryat">
                    <span id="rsrsr"></span>
                    <div><?php _e('No matches today', LIVEPRESS_TEXTDOMAIN); ?></div>
                    <span id="lslsl"></span>
                </div>
                <?php } wp_reset_postdata();?>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const tabLinks = document.querySelectorAll('.tablinks');
        const dateDisplay = document.getElementById('date-display');

        // دالة لتغيير التابات وتحديث التاريخ
        tabLinks.forEach(tab => {
            tab.addEventListener('click', function(event) {
                const selectedTab = event.target.id;

                // إزالة الكلاس 'active' من كل التابات
                tabLinks.forEach(tab => tab.classList.remove('active'));

                // إضافة الكلاس 'active' للتاب المختار
                event.target.classList.add('active');

                let newDate;
                const today = "<?php echo $myToday; ?>";
                const yesterday = "<?php echo $yset; ?>";
                const tomorrow = "<?php echo $tomew; ?>";

                // تحديث التاريخ بناءً على التاب
                if (selectedTab === 'tod') {
                    newDate = today;
                } else if (selectedTab === 'yas') {
                    newDate = yesterday;
                } else if (selectedTab === 'tom') {
                    newDate = tomorrow;
                }

                // تحديث عرض التاريخ المعروض
                const dateObj = new Date(newDate);
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                };
                dateDisplay.textContent = dateObj.toLocaleDateString('ar-EG', options); // عرض التاريخ بالعربية
            });
        });
    });

</script>
